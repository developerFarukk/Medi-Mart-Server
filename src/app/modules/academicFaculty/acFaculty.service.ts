import QueryBuilder from "../../builder/QueryBuilder";
import { acFacultySearchableFields } from "./acFaculty.constant";
import { TAcademicFaculty } from "./acFaculty.interface";
import { AcademicFaculty } from "./acFaculty.model";

// Create AcademicFaculty
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload);
    return result;
};

// All get AcademicFaculty
const getAllAcademicFacultiesFromDB = async (query: Record<string, unknown>) => {

    const acFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
        .search(acFacultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await acFacultyQuery.countTotal();
    const result = await acFacultyQuery.modelQuery;

    return {
        meta,
        result,
    };
};

// Single get AcademicFaculty
const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
};


// Updat faculty
const updateAcademicFacultyIntoDB = async (
    id: string,
    payload: Partial<TAcademicFaculty>,
) => {
    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB,
};