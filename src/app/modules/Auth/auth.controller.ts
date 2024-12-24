
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

// user Login 
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, accessToken, needsPasswordChange } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true,
    });

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
    // console.log(req.user, req.body);

    const result = await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password is updated succesfully!',
        data: result,
    });
});

// Refress Token
const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: result,
    });
});


export const AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
};