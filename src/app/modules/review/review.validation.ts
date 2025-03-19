import { z } from "zod";


// Update Zod Route Validation
export const createReviewValidationSchema = z.object({
    body: z.object({
        product: z.string(),
        title: z.string(),
        message: z.string(),
        reviewCount: z
            .number()
            .positive()
            .min(1, 'Minimum count 1')
            .max(5, 'Maximum count 5'),
    })

});

export const reviewValidations = {
    createReviewValidationSchema,
};