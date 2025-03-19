
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { reviewServices } from "./review.service";
// import { TJwtPayload } from "../auth/auth.interface";
import httpStatus from "http-status";
import { TJwtPayload } from "../auth/auth.interface";

// Creat review Function
const createReview = catchAsync(async (req, res) => {

    // const userId = req.user?.userId
    const user = req.user


    const result = await reviewServices.createReviewIntoDB(
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



export const reviewController = {
    createReview
};