import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { AdminSearchableFields } from "./admin.constant";
import { Admin } from "./admin.model";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status";


// All Admin Data Get
const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
    const adminQuery = new QueryBuilder(Admin.find(), query)
        .search(AdminSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await adminQuery.modelQuery;
    return result;
};

// Single Admin data get
const getSingleAdminFromDB = async (id: string) => {
    const result = await Admin.findById(id);
    return result;
};


// Delete Admin Single Data Finction
const deleteAdminFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedAdmin = await Admin.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedAdmin) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
        }

        // get user _id from deletedAdmin
        const userId = deletedAdmin.user;

        const deletedUser = await User.findOneAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedAdmin;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};



export const AdminServices = {
    getAllAdminsFromDB,
    getSingleAdminFromDB,
    // updateAdminIntoDB,
    deleteAdminFromDB,
};