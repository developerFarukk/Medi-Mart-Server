
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
// import bcrypt from 'bcrypt';


// LogIn User Function
const loginUser = async (payload: TLoginUser) => {

    // Check User exixtse
    const user = await User.isUserExistsByCustomId(payload.id);

    // console.log(isUserExists);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user ID is not found !');
    }

    // // Check User deleted isu
    // const isDeleted = isUserExists?.isDeleted;
    // if (isDeleted) {
    //     throw new AppError(httpStatus.FORBIDDEN, 'This user is  delated !');
    // }

    // // Check User Blocked
    // const userStatus = isUserExists?.status;
    // if (userStatus === 'blocked') {
    //     throw new AppError(httpStatus.FORBIDDEN, 'This User is Blocked !');
    // }

    //checking if the password is correct
    //checking if the password is correct

    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    // if (!isPasswordMatched) {
    //     throw new AppError(httpStatus.FORBIDDEN, 'User Password do not match !');
    // }



    return {};





    // // checking if the user is exist
    // const user = await User.isUserExistsByCustomId(payload.id)

    // if (!user) {
    //     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    // }
    // // checking if the user is already deleted

    // const isDeleted = user?.isDeleted;

    // if (isDeleted) {
    //     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    // }

    // // checking if the user is blocked

    // const userStatus = user?.status;

    // if (userStatus === 'blocked') {
    //     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    // }

    // //checking if the password is correct

    // if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    //     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    // //create token and sent to the  client

    // const jwtPayload = {
    //     userId: user.id,
    //     role: user.role,
    // };

    // const accessToken = createToken(
    //     jwtPayload,
    //     config.jwt_access_secret as string,
    //     config.jwt_access_expires_in as string,
    // );

    // const refreshToken = createToken(
    //     jwtPayload,
    //     config.jwt_refresh_secret as string,
    //     config.jwt_refresh_expires_in as string,
    // );

    // return {
    //     accessToken,
    //     refreshToken,
    //     needsPasswordChange: user?.needsPasswordChange,
    // };
};


export const AuthServices = {
    loginUser,
    // changePassword,
    // refreshToken,
};