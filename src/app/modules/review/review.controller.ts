
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
// import { TJwtPayload } from "../auth/auth.interface";
import httpStatus from "http-status";
import { TJwtPayload } from "../auth/auth.interface";
import { ReviewServices } from "./review.service";

// Creat review Function
const createReview = catchAsync(async (req, res) => {

    // const userId = req.user?.userId
    const user = req.user


    const result = await ReviewServices.createReviewIntoDB(
        user as TJwtPayload,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review is created succesfully',
        data: result,
    });
});


// Delete Review
const deleteReview = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await ReviewServices.deleteReviewFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review is deleted succesfully',
        data: result,
    });
});


// All Review
const getAllReview = catchAsync(async (req, res) => {

    const result = await ReviewServices.getAllReviewFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Review get successfully',
        data: result
    });
});



export const ReviewController = {
    createReview,
    deleteReview,
    getAllReview
};