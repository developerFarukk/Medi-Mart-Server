

// import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
// import { Types } from "mongoose";
import { TOrder } from "./order.interface";
import { TJwtPayload } from "../auth/auth.interface";
import mongoose from "mongoose";
import { Medicin } from "../medicines/medicine.model";
import Order from "./order.model";


// Create Order 
const createOrderIntoDB = async (
    // payload: { products: { medicins: string; orderQuantity: number; subTotalPrice: number }[] },
    orderData: Partial<TOrder>,
    authUser: TJwtPayload
    // client_ip: string
) => {

    // console.log("Auth User", authUser);


    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (orderData.products) {

            for (const medicinItem of orderData.products) {

                // console.log(medicinItem);


                const product = await Medicin.findById(medicinItem.medicins)
                    // .populate("Medicin")
                    .session(session);

                if (product) {

                    // if (!product) {
                    //     throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
                    // }


                    if (product.quantity < medicinItem.orderQuantity) {
                        throw new Error(`Insufficient stock for product: ${product.name}`);
                    }

                    // Decrement the product stock
                    product.quantity -= medicinItem.orderQuantity
                    await product.save({ session });
                } else {
                    throw new Error(`Product not found: ${medicinItem.medicins}`);
                }



                // console.log(product);

            }


        }

        const order = new Order({
            ...orderData,
            user: authUser.userId,
        });

        console.log(order);
        

    } catch (error) {
        console.log(error);
        // Rollback the transaction in case of error
        await session.abortTransaction();
        session.endSession();
        throw error;
    }




    return null
};



export const OrderService = {
    createOrderIntoDB,
};