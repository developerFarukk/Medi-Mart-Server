


import { Model } from "mongoose";

export interface TUser {
    _id?: string; // MongoDB-এর ডিফল্ট `_id` ফিল্ড
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customers';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
    address: string;
    image?: string;
    number: string;
    passwordChangedAt?: Date;
}

export interface UserModel extends Model<TUser> {
    
    isUserExistsByEmail(id: string): Promise<TUser>;
    checkUserExist(userId: string): Promise<TUser>;

    getPublicUserData(userId: string): Promise<Pick<TUser, '_id' | 'name' | 'email' | 'role' | 'status' | 'isDeleted' | 'number' | 'address' | 'image'>>;

    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}