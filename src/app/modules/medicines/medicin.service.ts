import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { medicinSearchableFields } from "./medicine.constant";
import { TMedicine } from "./medicine.interface";
import { Medicin } from "./medicine.model";
import httpStatus from "http-status";


// Create Medicin Function
const createMedicinIntoDB = async (payload: TMedicine) => {

    const result = await Medicin.create(payload);

    return result;

};


// get all medicin
const getAllMedicinIntoDB = async (query: Record<string, unknown>) => {

    const medicinQuery = new QueryBuilder(
        Medicin.find(), query,
    )
        .search(medicinSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await medicinQuery.countTotal();
    const result = await medicinQuery.modelQuery;

    return {
        meta,
        result,
    };

}


// Update Medicin
const updateMedicinIntoDB = async (id: string, payload: Partial<TMedicine>) => {
    const existingMedicin = await Medicin.findOne({ _id: id });

    if (!existingMedicin) {
        throw new AppError(httpStatus.NOT_FOUND, 'Medicin id not found!');
    }

    // Check if quantity is being updated
    if (payload.quantity !== undefined) {

        if (payload.quantity === 0) {
            payload.stockAvailability = 'Stock Out';
        } else if (payload.quantity > 0) {
            payload.stockAvailability = 'Stock';
        }
    }

    const result = await Medicin.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        },
    );

    return result;
};


// Delete medicin
const deleteMedicinFromDB = async (id: string) => {

    const existingMedicin = await Medicin.findOne({ _id: id });

    if (!existingMedicin) {
        throw new AppError(httpStatus.NOT_FOUND, 'Medicin id not found!');
    }

    const result = await Medicin.findByIdAndDelete(id);
    return result;
};


// Delete medicin
const getSingleMedicinFromDB = async (id: string) => {

    const existingMedicin = await Medicin.findOne({ _id: id });

    if (!existingMedicin) {
        throw new AppError(httpStatus.NOT_FOUND, 'Medicin id not found!');
    }

    const result = await Medicin.findById(id);
    return result;
};


// get panfing Prescription
const getAllstockMediFromDB = async () => {
    const result = await Medicin.find({ stockAvailability: 'Stock' });
    
    return result;
};


export const MedicinServices = {
    createMedicinIntoDB,
    getAllMedicinIntoDB,
    updateMedicinIntoDB,
    deleteMedicinFromDB,
    getSingleMedicinFromDB,
    getAllstockMediFromDB
};