

import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status';



// Admin &  User Creat Function
const registerUserIntoDB = async (payload: TUser) => {

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email: payload.email });

    if (existingUser) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Email is already registered');
    }

    // Check if the user already exists by number
    const existingnumber = await User.findOne({ number: payload.number });
    
    if (existingnumber) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Number is already registered');
    }

    // const result = await User.create(payload);
    const publicUserData = await User.create(payload);
    const result = await User.getPublicUserData(publicUserData._id);

    return result

};


export const UserServices = {
    registerUserIntoDB
};