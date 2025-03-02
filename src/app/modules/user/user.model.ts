import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
    {

        name: {
            type: String,
            required: [true, 'user name is required'],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'user Email is required'],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password id is required'],
            select: 0,
            trim: true
        },
        role: {
            type: String,
            enum: ['admin', 'customers'],
        },
        status: {
            type: String,
            enum: ['in-progress', 'blocked'],
            default: 'in-progress',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        address: {
            type: String,
            trim: true,
            required: false
        }
    },
    {
        timestamps: true,
        // versionKey: false
    },
);


userSchema.pre('save', async function (next) {

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});


// Password Matched
userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};



export const User = model<TUser>('User', userSchema);