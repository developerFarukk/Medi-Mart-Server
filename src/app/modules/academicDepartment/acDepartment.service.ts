import { TAcademicDepartment } from "./acDepartment.interface";
import { AcademicDepartment } from "./acDepartment.model";



const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find().populate('academicFaculty');  // populate অন্য কালেকশন থেকে রেফার করা ডাটা নিয়ে আসে।
    return result;
};

// Single data get of department
const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result =
        await AcademicDepartment.findById(id).populate('academicFaculty');
    return result;
};

// const updateAcademicDepartmentIntoDB = async (
//     id: string,
//     payload: Partial<TAcademicDepartment>,
// ) => {
//     const result = await AcademicDepartment.findOneAndUpdate(
//         { _id: id },
//         payload,
//         {
//             new: true,
//         },
//     );
//     return result;
// };

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    // updateAcademicDepartmentIntoDB,
};