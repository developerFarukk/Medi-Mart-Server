
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

// user Login 
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);

    const { accessToken, needsPasswordChange } = result;
    // const { refreshToken, accessToken, needsPasswordChange } = result;

    // res.cookie('refreshToken', refreshToken, {
    //     secure: config.NODE_ENV === 'production',
    //     httpOnly: true,
    // });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in succesfully!',
        data: {
            accessToken,
            needsPasswordChange,
        },
    });
});

// Password Chenge user
const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;
    console.log(req.user, req.body);
    
    const result = await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password is updated succesfully!',
        data: result,
    });
});


export const AuthControllers = {
    loginUser,
    changePassword,
    // refreshToken,
};