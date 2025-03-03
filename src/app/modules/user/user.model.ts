import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
    {

        name: {
            type: String,
            required: [true, 'user name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'user Email is required'],
            unique: true,
            trim: true
        },
        number: {
            type: String,
            required: [true, 'User number is required'],
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
        },
        image: {
            type: String,
            required: false,
            default: ""
        },
        passwordChangedAt: {
            type: Date,
            default: null,
        },
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


// Spasic data send function
userSchema.statics.getPublicUserData = function (userId: string) {
    return this.findById(userId).select('id name email isDeleted status role address number image');
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password');
};


// Password Matched
userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};



export const User = model<TUser, UserModel>('User', userSchema);