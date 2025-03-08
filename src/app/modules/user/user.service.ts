

import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { userSearchableFields } from "./user.constant";
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


// get All user
const getAllUserIntoDB = async (query: Record<string, unknown>) => {

    const userQuery = new QueryBuilder(
        User.find(), query,
    )
        .search(userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await userQuery.countTotal();
    const result = await userQuery.modelQuery;

    return {
        meta,
        result,
    };

}


// Update user
const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {

    const existingUser = await User.findOne({ _id: id });

    if (!existingUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User id not found!');
    }

    const result = await User.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        },
    );
    return result;
};




export const UserServices = {
    registerUserIntoDB,
    getAllUserIntoDB,
    updateUserIntoDB
};