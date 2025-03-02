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
        message: 'User is created succesfully',
        data: result,
    });
});


export const UserControllers = {
    registerUser
};