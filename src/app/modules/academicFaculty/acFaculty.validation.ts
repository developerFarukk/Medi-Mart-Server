
import { z } from 'zod';

// Creat feculty validation
const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty must be string',
        }),
    }),
});


// Update faculty validation
const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic faculty must be string',
        }),
    }),
});

export const AcademicFacultyValidation = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema,
};