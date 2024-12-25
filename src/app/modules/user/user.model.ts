import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';


const userSchema = new Schema<TUser>(
    {
        id: {
            type: String,
            required: [true, 'user id is required'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'user Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password id is required'],
            select: 0
        },
        needsPasswordChange: {
            type: Boolean,
            default: true,
        },
        passwordChangedAt: {
            type: Date,
        },
        role: {
            type: String,
            enum: ['student', 'faculty', 'admin'],
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

// Existing ID
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id }).select('+password');
};

// Password Matched
userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Chenged password then tokn expired
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);