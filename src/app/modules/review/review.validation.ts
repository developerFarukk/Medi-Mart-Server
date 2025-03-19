import { z } from "zod";


// Update Zod Route Validation
export const createReviewValidationSchema = z.object({
    body: z.object({
        prodect: z.string(),
        title: z.string(),
        message: z.string(),
        reviewCount: z.number()
    })
});

export const OrderValidations = {
    createReviewValidationSchema,
};