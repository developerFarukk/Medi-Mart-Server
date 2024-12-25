

import { z } from 'zod';

// LogIn Validation
const loginValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: 'Id is required.' }),
        password: z.string({ required_error: 'Password is required' }),
    }),
});

// Change Password validation
const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: 'Old password is required',
        }),
        newPassword: z.string({ required_error: 'Password is required' }),
    }),
});

// Refress Token Validation
const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});

// forget password Validation
const forgetPasswordValidationSchema = z.object({
    body: z.object({
        id: z.string({
            required_error: 'User id is required!',
        }),
    }),
});

// Resete Password Validation
const resetPasswordValidationSchema = z.object({
    body: z.object({
        id: z.string({
            required_error: 'User id is required!',
        }),
        newPassword: z.string({
            required_error: 'User password is required!',
        }),
    }),
});

export const AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema
};