import { z } from "zod";


const userRole = z.enum(['admin', 'customer']);
const userStatus = z.enum(['in-progress', 'blocked']);

// User Validation
const userValidationSchema = z.object({
    body: z.object({
        password: z
            .string()
            .min(4, { message: 'Password must be at least 4 characters long.' })
            .max(20, { message: 'Password cannot exceed 20 characters.' }),
        name: z
            .string()
            .min(3, { message: 'Name must be at least 3 characters long.' })
            .max(20, { message: 'Name cannot exceed 20 characters.' }),
        number: z
            .string()
            .min(11, { message: 'Number must be at least 11 characters long.' }),

        email: z
            .string()
            .min(1, { message: 'Email is required.' })
            .email({ message: 'Please provide a valid email address.' }),

        address: z
            .string()
            .min(3, { message: 'Address must be at least 3 characters long.' })
            .max(100, { message: 'Address cannot exceed 100 characters.' }),
    })
});



// Update User Validation
const UpdateUserValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(3, { message: 'Name must be at least 3 characters long.' })
            .max(20, { message: 'Name cannot exceed 20 characters.' })
            .optional(),
        number: z
            .string()
            .min(11, { message: 'Number must be at least 11 characters long.' })
            .optional(),
        address: z
            .string()
            .min(3, { message: 'Address must be at least 3 characters long.' })
            .max(100, { message: 'Address cannot exceed 100 characters.' })
            .optional(),
        role: userRole.optional(),
        status: userStatus.optional(),
        isDeleted: z.boolean().optional(),
        image: z.string().optional()
    })
});



export const UserValidation = {
    userValidationSchema,
    UpdateUserValidationSchema
};