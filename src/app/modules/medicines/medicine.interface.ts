import { Types } from "mongoose";

export type TrequiredPrescriptions = 'Yes' | 'No';

export type TMedicinstatus = 'Stock' | 'Stock Out';

export type TMedicinCategory = "Analgesics" | "Antibiotics" | "Antipyretics" | "Antihistamines" | "Antidepressants" | "Antacids"
    | "Antidiabetics" | "Cardiovascular" | "Respiratory" | "Vitamins & Supplements"; 

interface Manufacturer {
    name: string;
    address: string;
    contactNumber: string;
}


export interface TMedicine {
    id?: Types.ObjectId;
    name: string;
    description: string;
    category: TMedicinCategory;
    price: number;
    quantity: number;
    stockAvailability: TMedicinstatus;
    requiredPrescription: TrequiredPrescriptions;
    manufacturerDetails: Manufacturer;
    expiryDate: Date;
    mediImage?: string;
    massUnit?: number;
}

