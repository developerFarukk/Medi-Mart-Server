
import { TAuth, TJwtPayload } from "./auth.interface";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';
import config from "../../config";
import { createToken } from "./auth.utils";


const loginUser = async (payload: TAuth) => {

    const user = await User.findOne({ email: payload.email }).select('+password');


    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    // Check if the password is correct
    if (!payload.password || !user.password) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Password is required');
    }

    const isPasswordMatched = await User.isPasswordMatched(payload.password, user.password);

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
    }

    // Check if the user is blocked
    if (user.status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }


    const jwtPayload: TJwtPayload = {
        userId: user._id as string,
        name: user.name as string,
        email: user.email as string,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    );

    // const refreshToken = createToken(
    //     jwtPayload,
    //     config.jwt_refresh_secret as string,
    //     config.jwt_refresh_expires_in as string
    // );

    // const updateUserInfo = await User.findByIdAndUpdate(
    //     user._id,
    //     { clientInfo: payload.clientInfo, lastLogin: Date.now() },
    //     { new: true, session }
    // );


    return {
        accessToken,
        // refreshToken,
    };


};


export const AuthService = {
    loginUser,
};