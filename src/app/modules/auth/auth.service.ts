import mongoose from "mongoose";
import { TAuth } from "./auth.interface";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';


const loginUser = async (payload: TAuth) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const user = await User.findOne({ email: payload.email }).session(
            session
        );

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
        }

        if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
            throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
        }

        // checking if the user is blocked
        const userStatus = user?.status;

        console.log(userStatus);
        

        if (userStatus === 'blocked') {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
        }

        // const jwtPayload: IJwtPayload = {
        //     userId: user._id as string,
        //     name: user.name as string,
        //     email: user.email as string,
        //     hasShop: user.hasShop,
        //     isActive: user.isActive,
        //     role: user.role,
        // };

        // const accessToken = createToken(
        //     jwtPayload,
        //     config.jwt_access_secret as string,
        //     config.jwt_access_expires_in as string
        // );

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

        await session.commitTransaction();

        // return {
        //     accessToken,
        //     refreshToken,
        // };

        return null

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};


export const AuthService = {
    loginUser,
};