
import { z } from 'zod';

const userValidationSchema = z.object({
    pasword: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(20, { message: 'Password must be less than 20 characters' }).optional()
});

export const UserValidation = {
    userValidationSchema,
};