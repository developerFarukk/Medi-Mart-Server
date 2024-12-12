
import QueryBuilder from "../../builder/QueryBuilder";
import { FacultySearchableFields } from "./faculty.constant";
import { Faculty } from "./faculty.model";


// All Faculty Data Get
const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {

    const facultyQuery = new QueryBuilder(
        Faculty.find()
            .populate({
                path: 'academicDepartment',
                populate: {
                    path: 'academicFaculty',
                },
            }),
        query,
    )
        .search(FacultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await facultyQuery.modelQuery;
    return result;
};

export const FacultyServices = {
    getAllFacultiesFromDB,
    // getSingleFacultyFromDB,
    // updateFacultyIntoDB,
    // deleteFacultyFromDB,
};