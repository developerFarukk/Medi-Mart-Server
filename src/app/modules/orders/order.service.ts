

// import { TOrder } from "./order.interface";
// import { TJwtPayload } from "../auth/auth.interface";
// import mongoose from "mongoose";
// import { Medicin } from "../medicines/medicine.model";
// import Order from "./order.model";

// // Create Order 
// const createOrderIntoDB = async (
//     orderData: Partial<TOrder>,
//     authUser: TJwtPayload
// ) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         if (orderData.products) {
//             let totalPrice = 0;
//             let totalQuantity = 0;

//             for (const medicinItem of orderData.products) {
//                 const product = await Medicin.findById(medicinItem.medicins).session(session);

//                 if (product) {
//                     if (product.quantity < medicinItem.orderQuantity) {
//                         throw new Error(`Insufficient stock for product: ${product.name}`);
//                     }

//                     // Decrement the product stock
//                     product.quantity -= medicinItem.orderQuantity;
//                     await product.save({ session });

//                     // Calculate subTotalPrice for each product
//                     medicinItem.subTotalPrice = product.price * medicinItem.orderQuantity;

//                     // Add to totalPrice
//                     totalPrice += medicinItem.subTotalPrice;
//                     totalQuantity = medicinItem.orderQuantity
//                 } else {
//                     throw new Error(`Product not found: ${medicinItem.medicins}`);
//                 }
//             }

//             // Set totalPrice in orderData
//             orderData.totalPrice = totalPrice;
//             orderData.totalQuantity = totalQuantity
//         }

//         const order = new Order({
//             ...orderData,
//             user: authUser.userId,
//         });

//         console.log(order);


//         const createdOrder = await order.save({ session });
//         await session.commitTransaction();
//         session.endSession();

//         return createdOrder;
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         throw error;
//     }
// };

// export const OrderService = {
//     createOrderIntoDB,
// };


import { TOrder } from "./order.interface";
import { TJwtPayload } from "../auth/auth.interface";
import mongoose from "mongoose";
import { Medicin } from "../medicines/medicine.model";
import Order from "./order.model";

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
            let totalQuantity = 0; // মোট quantity হিসাব করার জন্য ভেরিয়েবল

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
                    totalQuantity += medicinItem.orderQuantity; // প্রতিটি প্রোডাক্টের orderQuantity যোগ করা হচ্ছে
                } else {
                    throw new Error(`Product not found: ${medicinItem.medicins}`);
                }
            }

            // Set totalPrice and totalQuantity in orderData
            orderData.totalPrice = totalPrice;
            orderData.totalQuantity = totalQuantity; // মোট quantity সেট করা হচ্ছে
        }

        const order = new Order({
            ...orderData,
            user: authUser.userId,
        });

        console.log(order);

        const createdOrder = await order.save({ session });
        await createdOrder.populate("user products.medicins");

        await session.commitTransaction();
        session.endSession();

        return createdOrder;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const OrderService = {
    createOrderIntoDB,
};