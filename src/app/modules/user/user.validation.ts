
import { z } from 'zod';
import { UserStatus } from './user.constant';

// User Validation
const userValidationSchema = z.object({
    // id: z.string(),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(20, { message: 'Password must be less than 20 characters' })
        .optional(),
    // needsPasswordChange: z.boolean(),
    // role: z.enum(['admin', 'student', 'faculty'], {
    //     errorMap: () => ({ message: "Role must be 'admin', 'student', or 'faculty'" }),
    // }),
    // status: z.enum(['in-progress', 'blocked'], {
    //     errorMap: () => ({ message: "Status must be 'in-progress' or 'blocked'" }),
    // }),
    // isDeleted: z.boolean()
});


// User Status Validation
const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...UserStatus] as [string, ...string[]]),
    }),
});

export const UserValidation = {
    userValidationSchema,
    changeStatusValidationSchema
};