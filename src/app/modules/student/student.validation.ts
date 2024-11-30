
import { z } from 'zod';

// User name validation schema
const userNameSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: 'First Name is required' })
        .max(20, { message: 'First Name must be less than 20 characters' })
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: 'Last Name is required' }),
});

// Guardian validation schema
const guardianSchema = z.object({
    fatherName: z.string().min(1, { message: "Father's Name is required" }),
    fatherOccupation: z
        .string()
        .min(1, { message: "Father's Occupation is required" }),
    fatherContactNo: z
        .string()
        .min(1, { message: "Father's Contact Number is required" }),
    motherName: z.string().min(1, { message: "Mother's Name is required" }),
    motherOccupation: z
        .string()
        .min(1, { message: "Mother's Occupation is required" }),
    motherContactNo: z
        .string()
        .min(1, { message: "Mother's Contact Number is required" }),
});

// Local Guardian validation schema
const localGuardianSchema = z.object({
    name: z.string().min(1, { message: "Local Guardian's Name is required" }),
    occupation: z
        .string()
        .min(1, { message: "Local Guardian's Occupation is required" }),
    contactNo: z
        .string()
        .min(1, { message: "Local Guardian's Contact Number is required" }),
    address: z.string().min(1, { message: "Local Guardian's Address is required" }),
});

// Student validation schema
export const studentValidationSchema = z.object({
    id: z.string().min(1, { message: 'ID is required' }),
    // password: z
    //     .string()
    //     .min(6, { message: 'Password must be at least 6 characters' })
    //     .max(20, { message: 'Password must be less than 20 characters' }),
    name: userNameSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z
        .string()
        .optional()
        .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
            message: 'Invalid Date Format, must be YYYY-MM-DD',
        }),
    email: z.string().email({ message: 'Invalid email address' }),
    contactNo: z.string().min(10, { message: 'Contact Number is required' }),
    emergencyContactNo: z
        .string()
        .min(10, { message: 'Emergency Contact Number is required' }),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentAddress: z.string().min(1, { message: 'Present Address is required' }),
    permanentAddress: z.string().min(1, { message: 'Permanent Address is required' }),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: z
        .string()
        .optional()
        .refine((value) => !value || /^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(value), {
            message: 'Invalid URL for Profile Image',
        }),
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean().optional().default(false),
});

export default studentValidationSchema;
