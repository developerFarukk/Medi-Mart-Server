import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from 'http-status';



// Student Create Funtionality
const registerUser = catchAsync(async (req, res) => {
    // const { password, admin: adminData } = req.body;

    const result = await UserServices.registerUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is registered succesfully',
        data: result,
    });
});


// get All medicin
const getAllUser = catchAsync(async (req, res) => {

    const result = await UserServices.getAllUserIntoDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All user Data get successfully',
        data: result,
    });

});


// Update user
const updateUser = catchAsync(async (req, res) => {

    const { userId } = req.params;
    const result = await UserServices.updateUserIntoDB(userId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is updated succesfully',
        data: result,
    });
});


export const UserControllers = {
    registerUser,
    getAllUser,
    updateUser
};