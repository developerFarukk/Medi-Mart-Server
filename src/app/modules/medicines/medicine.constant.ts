import { TMedicinCategory, TMedicinstatus, TrequiredPrescriptions } from "./medicine.interface";

// Medicin Stock
export const MedicinStatus: TMedicinstatus[] = ['Stock', 'Stock Out'];

export const RequiredPrescriptions: TrequiredPrescriptions[] = ['Yes', 'No'];


export const MedicinCategory: TMedicinCategory[] = ["Analgesics", "Antibiotics", "Antipyretics", "Antihistamines", "Antidepressants", "Antacids", "Antidiabetics", "Cardiovascular", "Respiratory", "Vitamins & Supplements"];



export const medicinSearchableFields = [
    'email',
    '_id',
    'category',
    'name',
    'stockAvailability',
    'requiredPrescription',
    'manufacturerDetails.name',
    'manufacturerDetails.contactNumber',
];