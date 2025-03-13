

import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
// import { Types } from "mongoose";
import { TOrder } from "./order.interface";
import { TJwtPayload } from "../auth/auth.interface";


// Create Order 
const createOrderIntoDB = async (
    // payload: { products: { medicins: string; orderQuantity: number; subTotalPrice: number }[] },
    orderData:  Partial<TOrder>,
    authUser: TJwtPayload 
    // client_ip: string
) => {

    console.log("order data", orderData);
    
    

    // console.log("pay", payload);
    

    // const userId = user?.userId;

    // console.log(userId);
    

    // // Validate user existence
    const userData = await User.getPublicUserData(authUser?.userId);

    console.log(userData);
    

    if (!userData) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // // Validate payload
    // if (!payload?.products || payload?.products?.length === 0) {
    //     throw new AppError(httpStatus.BAD_REQUEST, 'No products in the order');
    // }

    // // Process each product in the order
    // let totalPrice = 0;

    // const productsWithObjectId = payload.products.map((medicin) => ({
    //     medicins: new Types.ObjectId(medicin?.medicins),
    //     orderQuantity: medicin?.orderQuantity,
    //     subTotalPrice: medicin?.orderQuantity * medicin?.medicins
    // }));

    // for (const product of productsWithObjectId) {
    //     const bicycle = await Bicycle.findById(product.product);
    //     if (!bicycle) {
    //         throw new AppError(httpStatus.NOT_FOUND, `Bicycle with ID ${product.product} not found`);
    //     }

    //     if (bicycle.isDeleted) {
    //         throw new AppError(httpStatus.FORBIDDEN, `Bicycle with ID ${product.product} is deleted`);
    //     }

    //     if (bicycle.quantity < product.quantity) {
    //         throw new AppError(httpStatus.BAD_REQUEST, `Insufficient stock for bicycle with ID ${product.product}`);
    //     }

    //     // Deduct the stock
    //     bicycle.quantity -= product.quantity;
    //     await bicycle.save();

    //     // Calculate total price
    //     totalPrice += bicycle.price * product.quantity;
    // }


    // const orderData = {
    //     products: productsWithObjectId,
    //     user: new Types.ObjectId(userId),
    //     totalPrice,
    //     status: 'Pending',
    // } as TOrder;

    // let order = await Order.create(orderData);

    // // Payment integration
    // const shurjopayPayload = {
    //     amount: totalPrice,
    //     order_id: order._id,
    //     currency: "BDT",
    //     customer_name: userData.name,
    //     customer_address: userData.address || "Sylhet",
    //     customer_email: userData.email,
    //     customer_phone: userData.mobile || "01917540405",
    //     customer_city: userData.address || "block 4, ck goush road, Sylhet",
    //     client_ip,
    // };


    // const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    // if (payment?.transactionStatus) {
    //     const updatedOrder = await Order.findByIdAndUpdate(
    //         order._id,
    //         {
    //             transaction: {
    //                 id: payment.sp_order_id,
    //                 transactionStatus: payment.transactionStatus,
    //             },
    //         },
    //         { new: true }
    //     );

    //     if (!updatedOrder) {
    //         throw new AppError(httpStatus.NOT_FOUND, 'Order not found after update');
    //     }

    //     order = updatedOrder;
    // }

    // return {
    //     order,
    //     payment,
    //     paymentUrl: payment.checkout_url,
    // };
    return payload
};



export const OrderService = {
    createOrderIntoDB,
};