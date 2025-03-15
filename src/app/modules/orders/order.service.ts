

import { TJwtPayload } from "../auth/auth.interface";
import mongoose from "mongoose";
import { Medicin } from "../medicines/medicine.model";
import Order from "./order.model";
import { generateTransactionId } from "../payment/payment.utils";
import { sslService } from "../sslcommerz/sslcommerz.service";
import AppError from "../../errors/AppError";
import { TOrder } from "./order.interface";
import { Payment } from "../payment/payment.model";

// Create Order 
const createOrderIntoDB = async (
    orderData: Partial<TOrder>,
    authUser: TJwtPayload
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

        const order = new Order({
            ...orderData,
            user: authUser.userId,
        });

        const createdOrder = await order.save({ session });
        await createdOrder.populate("user products.medicins");


        const transactionId = generateTransactionId();

        // Payment integration
        const payment = new Payment({
            user: authUser.userId,
            // medicin: createdOrder.products,
            order: createdOrder._id,
            method: orderData.paymentMethod,
            transactionId,
            amount: createdOrder.totalPrice,
            totalQuantity: createdOrder?.totalQuantity
        });

        await payment.save({ session });


        let result;

        if (createdOrder.paymentMethod == "Online") {
            result = await sslService.initPayment({
                total_amount: createdOrder.totalPrice,
                tran_id: transactionId,
            });
            result = { paymentUrl: result };
        } else {
            result = order;
        }


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


        await session.commitTransaction();
        session.endSession();

        return result;

        // return createdOrder;
        // return {
        //     createdOrder,
        //     // payment
        //     // order
        // }
        ;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const OrderService = {
    createOrderIntoDB,
};