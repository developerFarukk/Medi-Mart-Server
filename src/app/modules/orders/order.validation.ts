

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
        precriptionImage: z.string().optional()
    }),
});


export const OrderValidations = {
    createOrderValidationSchema,
};