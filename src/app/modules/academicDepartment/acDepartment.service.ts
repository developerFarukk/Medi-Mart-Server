import QueryBuilder from "../../builder/QueryBuilder";
import { acDepartmentSearchableFields } from "./acDepartment.constent";
import { TAcademicDepartment } from "./acDepartment.interface";
import { AcademicDepartment } from "./acDepartment.model";


// Ceate AcademicDepartments
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
};

// populate অন্য কালেকশন থেকে রেফার করা ডাটা নিয়ে আসে।


// All get AcademicDepartments
const getAllAcademicDepartmentsFromDB = async (query: Record<string, unknown>) => {
    // const result = await AcademicDepartment.find().populate('academicFaculty');  

    const acDepartmentQuery = new QueryBuilder(AcademicDepartment.find().populate('academicFaculty'), query)
        .search(acDepartmentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await acDepartmentQuery.countTotal();
    const result = await acDepartmentQuery.modelQuery;

    return {
        meta,
        result,
    };
};

// Single data get of department
const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result =
        await AcademicDepartment.findById(id).populate('academicFaculty');
    return result;
};


// Update Department Data
const updateAcademicDepartmentIntoDB = async (
    id: string,
    payload: Partial<TAcademicDepartment>,
) => {
    const result = await AcademicDepartment.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        },
    );
    return result;
};

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB,
};