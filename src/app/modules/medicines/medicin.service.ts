import QueryBuilder from "../../builder/QueryBuilder";
import { medicinSearchableFields } from "./medicine.constant";
import { TMedicine } from "./medicine.interface";
import { Medicin } from "./medicine.model";


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
const updateMedicinIntoDB = async ( id: string, payload: Partial<TMedicine> ) => {

    const result = await Medicin.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        },
    );
    return result;
};


export const MedicinServices = {
    createMedicinIntoDB,
    getAllMedicinIntoDB,
    updateMedicinIntoDB
};