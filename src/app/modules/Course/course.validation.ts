

import { z } from 'zod';

// Pre Request Zod Route Validation
const PreRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
});


// Create Course Zod Route Validation
const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
        isDeleted: z.boolean().optional(),
    }),
});


// Update Pre-Request Course Route Validation
const updatePreRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
});


// Update Course Route Validation
const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credits: z.number().optional(),
        preRequisiteCourses: z
            .array(updatePreRequisiteCourseValidationSchema)
            .optional(),
        isDeleted: z.boolean().optional(),
    }),
});


// Faculty  with Course Route Validation
const facultiesWithCourseValidationSchema = z.object({
    body: z.object({
        faculties: z.array(z.string()),
    }),
});

export const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    facultiesWithCourseValidationSchema,
};