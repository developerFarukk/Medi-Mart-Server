

import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status';



// Admin &  User Creat Function
const registerUserIntoDB = async (payload: TUser) => {

    // checking if the user is exist
    const user = await User.findOne({email: payload?.email, number: payload?.number }).select('+password');
    

    if (user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is already axist !');
    }

};


export const UserServices = {
    registerUserIntoDB
};