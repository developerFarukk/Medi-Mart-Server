
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";


// Creat Course Function
const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};

// All Course data Get
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Course.find(),
        // .populate('preRequisiteCourses.course'),
        query,
    )
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await courseQuery.modelQuery;
    return result;
};

// Single Course Data Get
const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
    );
    return result;
};

// Delete Course Data
const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },
    );
    return result;
};




export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    // updateCourseIntoDB,
    deleteCourseFromDB,
    // assignFacultiesWithCourseIntoDB,
    // removeFacultiesFromCourseFromDB,
};