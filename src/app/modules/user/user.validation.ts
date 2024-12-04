
import { z } from 'zod';


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

export const UserValidation = {
    userValidationSchema,
};