import { model, Schema } from "mongoose";
import { TMedicine } from "./medicine.interface";
import { MedicinStatus, RequiredPrescriptions } from "./medicine.constant";


const MedicinSchema = new Schema<TMedicine>(
    {
        name: {
            type: String,
            required: [true, 'Medicin Name is required'],
            trim: true,
            maxlength: [20, 'Medicin Name can not be more than 20 characters'],
        },
        description: {
            type: String,
            trim: true,
            required: [true, 'Medicin description is required'],
        },
        price: {
            type: Number,
            required: [true, 'Medicin Price is required'],
            trim: true,
            min: [0, 'Price cannot be negative'],
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: 'Price must be an integer value',
            },
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            trim: true,
            min: 0,
            default: 1,
        },
        stockAvailability: {
            type: String,
            trim: true,
            enum: {
                values: MedicinStatus,
                message: '{VALUE} is not a valid status',
            },
            default: 'Stock',
        },
        requiredPrescription: {
            type: String,
            trim: true,
            enum: {
                values: RequiredPrescriptions,
                message: '{VALUE} is not a valid requiredPrescription'
            }
        },
        mediImage: {
            type: String,
            required: false,
            default: ''
        },
        massUnit: {
            type: Number,
            required: false,
            default: 0.1
        },
        manufacturerDetails: {
            name: {
                type: String,
                trim: true,
                maxlength: [20, 'Medicin manufacturer Name can not be more than 20 characters'],

            },
            address: {
                type: String,
                trim: true,
                maxlength: [40, 'Medicin Company address Name can not be more than 40 characters'],
            },
            contactNumber: {
                type: String,
                trim: true
            }
        }
    },
    {
        timestamps: true,
    }
);



export const Medicin = model<TMedicine >('Medicin', MedicinSchema);