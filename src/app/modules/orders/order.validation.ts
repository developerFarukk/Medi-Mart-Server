

import { z } from "zod";


export const TOrderStatusSchema = z.enum(["Pending", 'Processing', "Shipped", "Delivered", "Cancelled"]);

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




// Update Zod Route Validation
export const updateOrderValidationSchema = z.object({
    body: z.object({
        // quantity: z.number().positive().optional(),
        status: TOrderStatusSchema.optional()
    })
});


export const OrderValidations = {
    createOrderValidationSchema,
    updateOrderValidationSchema
};