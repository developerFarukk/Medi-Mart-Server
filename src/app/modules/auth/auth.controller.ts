import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";


// user Login 
const loginUser = catchAsync(async (req, res) => {

    const result = await AuthService.loginUser(req.body);

    // const { refreshToken, accessToken, needsPasswordChange } = result;

    // res.cookie('refreshToken', refreshToken, {
    //     secure: config.node_env === 'production',
    //     httpOnly: true,
    //     // sameSite: 'none',
    //     // maxAge: 1000 * 60 * 60 * 24 * 365,
    // });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in succesfully!',
        // data: {
        //     accessToken,
        //     needsPasswordChange,
        // },
        data: result
    });
});


export const AuthControllers = {
    loginUser,
};