

import { z } from 'zod';

// Define enums for MedicinStatus and RequiredPrescriptions
const RequiredPrescriptions = z.enum(['Yes', 'No']);

const medicinsCategory = z.enum(["Analgesics", "Antibiotics", "Antipyretics", "Antihistamines", "Antidepressants", "Antacids", "Antidiabetics", "Cardiovascular", "Respiratory", "Vitamins & Supplements"]);

// Define the schema for manufacturerDetails
const manufacturerDetailsSchema = z.object({
    name: z.string().trim().max(20, 'Medicin manufacturer Name can not be more than 20 characters'),
    address: z.string().trim().max(40, 'Medicin Company address Name can not be more than 40 characters'),
    contactNumber: z.string().trim(),
});

// Define the main schema for the model
const medicinValidationSchema = z.object({
    body: z.object({
        name: z.string()
            .trim()
            .min(1, 'Medicin Name is required')
            .max(20, 'Medicin Name can not be more than 20 characters'),
        description: z.string()
            .trim()
            .min(1, 'Medicin description is required'),
        price: z.number()
            .min(0, 'Price cannot be negative')
            .int('Price must be an integer value')
            .default(0),
        quantity: z.number()
            .min(0, 'Quantity cannot be negative')
            .default(1),
        category: medicinsCategory,
        requiredPrescription: RequiredPrescriptions,
        massUnit: z.number()
            .default(0.1),
        manufacturerDetails: manufacturerDetailsSchema,
    })
});


// Update validation Schema
const updatemedicinValidationSchema = z.object({
    body: z.object({
        name: z.string()
            .trim()
            .min(1, 'Medicin Name is required')
            .max(20, 'Medicin Name can not be more than 20 characters').optional(),
        description: z.string()
            .trim()
            .min(1, 'Medicin description is required').optional(),
        price: z.number()
            .min(0, 'Price cannot be negative')
            .int('Price must be an integer value')
            .default(0).optional(),
        quantity: z.number()
            .min(0, 'Quantity cannot be negative')
            .default(1).optional(),
        category: medicinsCategory.optional(),
        requiredPrescription: RequiredPrescriptions.optional(),
        massUnit: z.number()
            .default(0.1).optional(),
        manufacturerDetails: manufacturerDetailsSchema.optional(),
    })
});



export const MedicinValidation = {
    medicinValidationSchema,
    updatemedicinValidationSchema
};