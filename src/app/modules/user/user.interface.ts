import { Model } from "mongoose";


export interface TUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customers';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
    address: string;
    image?: string;
};



export interface UserModel extends Model<TUser> {

    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;

}