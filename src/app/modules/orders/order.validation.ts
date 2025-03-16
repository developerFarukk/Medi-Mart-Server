

import { z } from "zod";


export const createOrderValidationSchema = z.object({
    body: z.object({
        products: z.array(
            z.object({
                medicins: z.string(),
                orderQuantity: z.number().positive(),
            }),
        ),
        shippingAddress: z.string().optional(),
        precriptionImage: z.string().optional(),
        city: z.string()
            .min(2, 'City Name is required')
            .max(50, 'City Name can not be more than 50 characters'),
    }),
});


export const OrderValidations = {
    createOrderValidationSchema,
};