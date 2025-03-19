

import mongoose from "mongoose";
import { TJwtPayload } from "../auth/auth.interface";
import { TReview } from "./review.interface";
import { Medicin } from "../medicines/medicine.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import Review from "./review.model";
import { User } from "../user/user.model";



// // Create review Function
const createReviewIntoDB = async (
    authUser: TJwtPayload,
    // reviewData: Partial<TReview>
    payload: TReview
) => {

    const productId = await Medicin.findById(payload?.product)

    if (!productId) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }

    const userId = await User.findById(authUser?.userId)

    if (!userId) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const review = {
        ...payload,
        user: authUser?.userId
    }

    const creatreview = await Review.create(review)


    return creatreview

};

// Delete Review
const deleteReviewFromDB = async (id: string) => {

    const existinReview = await Review.findById({ _id: id });
    
    if (!existinReview) {
        throw new AppError(httpStatus.NOT_FOUND, 'Review id not found!');
    }

    const result = await Review.findByIdAndDelete(existinReview);
    
    return result;
};



export const ReviewServices = {
    createReviewIntoDB,
    deleteReviewFromDB
};

