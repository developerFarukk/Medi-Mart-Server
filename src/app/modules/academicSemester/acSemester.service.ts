import QueryBuilder from "../../builder/QueryBuilder";
import { academicSearchableFields, academicSemesterNameCodeMapper } from "./acSemester.constant";
import { TAcademicSemester } from "./acSemester.interface";
import { AcademicSemester } from "./acSemester.model";

// Creat Academic semister
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    // semester name --> semester code
    // academicSemesterNameCodeMapper['Fall']
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
    }

    const result = await AcademicSemester.create(payload);
    return result;
};

// all data get Academic semister
const getAllAcademicSemestersFromDB = async (query: Record<string, unknown>) => {

    const academicSemisterQuery = new QueryBuilder(AcademicSemester.find(), query)
        .search(academicSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();


    const meta = await academicSemisterQuery.countTotal();
    const result = await academicSemisterQuery.modelQuery;

    return {
        meta,
        result,
    };
};

// single data get academic semister
const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
};

// update academic semister
const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
) => {
    if (
        payload.name &&
        payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
        throw new Error('Invalid Semester Code');
    }

    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB,
};