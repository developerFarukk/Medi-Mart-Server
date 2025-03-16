

import { TJwtPayload } from "../auth/auth.interface";
import mongoose from "mongoose";
import { Medicin } from "../medicines/medicine.model";
import Order from "./order.model";
import { generateTransactionId } from "../payment/payment.utils";
import AppError from "../../errors/AppError";
import { TOrder } from "./order.interface";
import { orderUtils } from "./order.utils";
import httpStatus from "http-status";

// Create Order 
const createOrderIntoDB = async (
    orderData: Partial<TOrder>,
    authUser: TJwtPayload,
    client_ip: string
) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
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
                    await product.save({ session });

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

        // const transactionId = generateTransactionId();

        const orders = new Order({
            ...orderData,
            user: authUser.userId,
            // transactionId
        }) as TOrder;

        let createdOrder = await orders.save({ session });
        await createdOrder.populate("user products.medicins");

        // console.log(createdOrder);



        // let order = await Order.create(createdOrder);



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
                createdOrder,
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


        // const shurjopayPayload = {
        //     amount: createdOrder?.totalPrice,
        //     order_id: transactionId,
        //     currency: "BDT",
        //     customer_name: createdOrder?.user?.name,
        //     customer_address: createdOrder?.shippingAddress,
        //     customer_email: createdOrder?.user?.email,
        //     customer_phone: createdOrder?.user?.number,
        //     customer_city: createdOrder?.city,
        //     client_ip,
        // };


        // const payment = await orderUtils.makePaymentAsync(shurjopayPayload);



        // if (payment?.transactionStatus) {
        //     const updatedOrder = await Order.findByIdAndUpdate(
        //         createdOrder._id,
        //         {
        //             tranjectionId: transactionId,
        //             transaction: {
        //                 id: payment.sp_order_id,
        //                 transactionStatus: payment.transactionStatus,
        //             },
        //         },
        //         { new: true, session }
        //     );

        //     if (!updatedOrder) {
        //         throw new AppError(httpStatus.NOT_FOUND, 'Order not found after update');
        //     }

        //     createdOrder = updatedOrder;
        // }


        // Payment integration
        // const payment = new Payment({
        //     user: authUser.userId,
        //     // medicin: createdOrder.products,
        //     order: createdOrder._id,
        //     method: orderData.paymentMethod,
        //     transactionId,
        //     amount: createdOrder.totalPrice,
        //     totalQuantity: createdOrder?.totalQuantity
        // });

        // await payment.save({ session });


        // let result;

        // if (createdOrder.paymentMethod == "Online") {
        //     result = await sslService.initPayment({
        //         total_amount: createdOrder.totalPrice,
        //         tran_id: transactionId,
        //     });
        //     result = { paymentUrl: result };
        // } else {
        //     result = order;
        // }


        // const payments = {
        //     transactionId,
        //     paymentMethod: createdOrder?.paymentMethod,
        //     paymentStatus: createdOrder?.paymentStatus,
        //     amount: createdOrder?.totalPrice,
        // } as TPayment

        // const payment = await sslService.initPayment(payments);
        // console.log(payment);


        // await payment.save({ session });

        // let order

        // if (payment?.paymentStatus == "Online") {
        //     const updatedOrder = await Order.findByIdAndUpdate(
        //         order._id,
        //         {
        //             payment: {
        //                 total_amount: createdOrder?.totalPrice,
        //                 tarn_id: transactionId
        //             },
        //         },
        //         { new: true }
        //     );

        //     if (!updatedOrder) {
        //         throw new AppError(httpStatus.NOT_FOUND, 'Order not found after update');
        //     }

        //     order = updatedOrder;
        // }


        // await session.commitTransaction();
        // session.endSession();

        // return {
        //     createdOrder,
        //     paymentUrl: payment.checkout_url
        // }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const OrderService = {
    createOrderIntoDB,
};