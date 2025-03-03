import { Types } from "mongoose";

export type TrequiredPrescriptions = 'Yes' | 'No';

export type TMedicinstatus = 'Stock' | 'Stock Out';

interface Manufacturer {
    name: string;
    address: string;
    contactNumber: string;
}


export interface TMedicine {
    id?: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    quantity: number;
    stockAvailability: TMedicinstatus;
    requiredPrescription: TrequiredPrescriptions;
    manufacturerDetails: Manufacturer;
    expiryDate: Date;
    mediImage?: string;
    massUnit?: number;
}

