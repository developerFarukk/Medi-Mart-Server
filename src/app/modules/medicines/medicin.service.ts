import { TMedicine } from "./medicine.interface";
import { Medicin } from "./medicine.model";


// Create Medicin Function
const createMedicinIntoDB = async (payload: TMedicine) => {

    const result = await Medicin.create(payload);
    
    return result;

};


export const MedicinServices = {
    createMedicinIntoDB
};