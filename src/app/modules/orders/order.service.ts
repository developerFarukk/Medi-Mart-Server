

import { TJwtPayload } from "../auth/auth.interface";
import mongoose from "mongoose";
import { Medicin } from "../medicines/medicine.model";
import Order from "./order.model";
import { generateTransactionId } from "../payment/payment.utils";
import AppError from "../../errors/AppError";
import { TOrder } from "./order.interface";
import { orderUtils } from "./order.utils";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { isValidStatusTransition, OrderSearchableFields } from "./order.constant";
import { sendEmail } from "../../utils/sendEmail";
import { User } from "../user/user.model";

// Create Order 
const createOrderIntoDB = async (
    orderData: Partial<TOrder>,
    authUser: TJwtPayload,
    client_ip: string
) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (orderData.precriptionImage && orderData.precriptionImage.trim() !== "") {
            orderData.prescriptionStatus = 'Pending';
        } else {
            orderData.prescriptionStatus = 'Approved';
        }

        if (orderData.products) {
            let totalPrice = 0;
            let totalQuantity = 0;

            for (const medicinItem of orderData.products) {
                const product = await Medicin.findById(medicinItem.medicins).session(session);

                if (product) {
                    if (product.quantity < medicinItem.orderQuantity) {
                        throw new Error(`Insufficient stock for product: ${product.name}`);
                    }

                    // Decrement the product stock
                    product.quantity -= medicinItem.orderQuantity;

                    // Update stockAvailability if quantity is 0
                    if (product.quantity === 0) {
                        product.stockAvailability = 'Stock Out';
                    }

                    await product.save({ session });

                    // Check if prescription is required
                    if (product.requiredPrescription === 'Yes' && !orderData.precriptionImage) {
                        throw new Error(`Prescription image is required for product: ${product.name}`);
                    }

                    // Calculate subTotalPrice for each product
                    medicinItem.subTotalPrice = product.price * medicinItem.orderQuantity;

                    // Add to totalPrice
                    totalPrice += medicinItem.subTotalPrice;

                    // Add to totalQuantity
                    totalQuantity += medicinItem.orderQuantity;
                } else {
                    throw new Error(`Product not found: ${medicinItem.medicins}`);
                }
            }

            // Set totalPrice and totalQuantity in orderData
            orderData.totalPrice = totalPrice;
            orderData.totalQuantity = totalQuantity;
        }

        const orders = new Order({
            ...orderData,
            user: authUser.userId
        }) as TOrder;

        let createdOrder = await orders.save({ session });
        await createdOrder.populate("user products.medicins");

        const transactionId = generateTransactionId();

        if (orderData.paymentMethod === 'Online') {
            const shurjopayPayload = {
                amount: createdOrder?.totalPrice,
                order_id: transactionId,
                currency: "BDT",
                customer_name: createdOrder?.user?.name,
                customer_address: createdOrder?.shippingAddress,
                customer_email: createdOrder?.user?.email,
                customer_phone: createdOrder?.user?.number,
                customer_city: createdOrder?.city,
                client_ip,
            };

            const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

            if (payment?.transactionStatus) {
                const updatedOrder = await Order.findByIdAndUpdate(
                    createdOrder._id,
                    {
                        tranjectionId: payment?.sp_order_id,
                        transaction: {
                            id: payment.sp_order_id,
                            transactionStatus: payment.transactionStatus,
                        },
                    },
                    { new: true, session }
                );

                if (!updatedOrder) {
                    throw new AppError(httpStatus.NOT_FOUND, 'Order not found after update');
                }

                createdOrder = updatedOrder;
            }

            await session.commitTransaction();
            session.endSession();

            return {
                paymentUrl: payment.checkout_url
            };
        } else {
            await session.commitTransaction();
            session.endSession();

            return {
                createdOrder,
                paymentUrl: null
            };
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


// veryfy pament
const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

    if (verifiedPayment.length) {
        await Order.findOneAndUpdate(
            {
                "transaction.id": order_id,
            },
            {
                "transaction.bank_status": verifiedPayment[0].bank_status,
                "transaction.sp_code": verifiedPayment[0].sp_code,
                "transaction.sp_message": verifiedPayment[0].sp_message,
                "transaction.transactionStatus": verifiedPayment[0].transaction_status,
                "transaction.method": verifiedPayment[0].method,
                "transaction.date_time": verifiedPayment[0].date_time,
                // status:
                //     verifiedPayment[0].bank_status == "Success"
                //         ? "Paid"
                //         : verifiedPayment[0].bank_status == "Failed"
                //             ? "Pending"
                //             : verifiedPayment[0].bank_status == "Cancel"
                //                 ? "Cancelled"
                //                 : "",
                paymentStatus:
                    verifiedPayment[0].bank_status == "Success"
                        ? "Paid"
                        : verifiedPayment[0].bank_status == "Failed"
                            ? "Pending"
                            : verifiedPayment[0].bank_status == "Cancel"
                                ? "Cancelled"
                                : "",
            }
        );
    }

    return verifiedPayment;
};


// get All Order
const getAllOrderFromDB = async (query: Record<string, unknown>) => {

    const orderQuery = new QueryBuilder(Order.find()
        .populate("user")
        .populate({
            path: "products",
            populate: {
                path: 'medicins',
            },
        }),
        query,
    )
        .search(OrderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await orderQuery.countTotal();
    const result = await orderQuery.modelQuery;

    return {
        meta,
        result,
    };
};

// Get Me Order Data
const getMeOrderFromDB = async (query: Record<string, unknown>, userEmail: string) => {

    const orders = await Order.find()
        .populate({
            path: "user",
            match: { email: userEmail },
        })
        .populate({
            path: "products",
            populate: {
                path: 'Medicin',
            },
        })

    const filteredOrders = orders.filter(order => order.user !== null);

    const orderQuery = new QueryBuilder(Order.find({ _id: { $in: filteredOrders.map(order => order._id) } }), query)
        .search(OrderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await orderQuery.countTotal();
    const result = await orderQuery.modelQuery;

    return {
        meta,
        result,
    };
};


// Delete Order Data
const deleteOrderFromDB = async (id: string) => {

    const order = await Order.findById(id);

    // Check blog Exist
    if (!order) {
        throw new AppError(httpStatus.NOT_FOUND, 'This Order is not found !');
    }

    const result = Order.findByIdAndDelete(id)
    return result;
};


// Update Order
const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
    // Find the order
    const order = await Order.findById(id).populate('products.medicins');

    if (!order) {
        throw new AppError(httpStatus.NOT_FOUND, 'This Order is not found!');
    }

    // Check if status is being updated
    if (payload.status && payload.status !== order.status) {
        if (!isValidStatusTransition(order.status, payload.status)) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                `Invalid status transition from ${order.status} to ${payload.status}`
            );
        }
    }

    const user = await User.findById(order.user);


    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    // console.log(users);



    // if (payload.products) {
    //     for (const updatedProduct of payload.products) {
    //         // Find the corresponding product in the order
    //         const existingProduct = order.products.find(
    //             (p) => p.medicins?._id.toString() === updatedProduct?.medicins.toString()
    //         );

    //         if (!existingProduct) {
    //             throw new AppError(httpStatus.NOT_FOUND, 'Product not found in the order!');
    //         }

    //         // Find the bicycle in the database
    //         const bicycle = await Bicycle.isBicycleExists(updatedProduct.product.toString());
    //         if (!bicycle) {
    //             throw new AppError(httpStatus.NOT_FOUND, 'Bicycle not found!');
    //         }

    //         // Check if the requested quantity is available in stock
    //         const quantityDifference = updatedProduct.quantity - existingProduct.quantity;
    //         if (quantityDifference > 0 && bicycle.quantity < quantityDifference) {
    //             throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock for this bicycle!');
    //         }

    //         // Update the bicycle stock quantity
    //         await Bicycle.findByIdAndUpdate(
    //             bicycle.id,
    //             { $inc: { quantity: -quantityDifference } },
    //             { new: true }
    //         );

    //         // Update the product quantity in the order
    //         existingProduct.quantity = updatedProduct.quantity;
    //     }
    // }

    // Recalculate the total price of the order
    // if (payload.products) {
    //     let totalPrice = 0;
    //     for (const product of order.products) {
    //         const bicycle = await Bicycle.isBicycleExists(product.product.toString());
    //         if (!bicycle) {
    //             throw new AppError(httpStatus.NOT_FOUND, 'Bicycle not found!');
    //         }
    //         totalPrice += bicycle.price * product.quantity;
    //     }
    //     payload.totalPrice = totalPrice;
    // }

    // Update the order

    // const emailHtml = `
    //     <h1>Your Order Status Has Been Updated</h1>
    //     <p>Order ID: ${order.tranjectionId}</p>
    //     <p>New Status: ${payload.status}</p>
    //     <p>Thank you for shopping with us!</p>
    // `;

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Status Update</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #007bff;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
        }
        .email-body h2 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 15px;
        }
        .email-footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #666666;
        }
        .email-footer a {
            color: #007bff;
            text-decoration: none;
        }
        .email-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Order Status Update</h1>
        </div>
        <div class="email-body">
            <h2>Hello ${user.name},</h2>
            <p>Your order status has been updated. Here are the details:</p>
            <p><strong>Order ID:</strong> ${order.tranjectionId}</p>
            <p><strong>New Status:</strong> ${payload.status}</p>
            <p>Thank you for shopping with us. If you have any questions, feel free to contact us.</p>
        </div>
        <div class="email-footer">
            <p>If you did not make this request, please ignore this email.</p>
            <p>© 2025 MediMart. All rights reserved.</p>
            <p><a href="https://medimart-client-one.vercel.app">Visit our website</a></p>
        </div>
    </div>
</body>
</html>
`;


    await sendEmail(user.email, emailHtml);


    // sendEmail(user.email, emailHtml);


    const result = await Order.findOneAndUpdate(
        { _id: id },
        { ...payload, products: order.products },
        { new: true }
    );


    // console.log(sendEmail);


    return result;
};


// get panfing Prescription
const getAllPendingOrderFromDB = async () => {
    const result = await Order.find({ prescriptionStatus: 'Pending' });
    return result;
};

export const OrderService = {
    createOrderIntoDB,
    verifyPayment,
    getAllOrderFromDB,
    getMeOrderFromDB,
    deleteOrderFromDB,
    updateOrderIntoDB,
    getAllPendingOrderFromDB
};