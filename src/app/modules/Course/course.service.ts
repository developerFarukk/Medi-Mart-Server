
import { TCourse } from "./course.interface";
import { Course } from "./course.model";


// Creat Course Function
const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};



export const CourseServices = {
    createCourseIntoDB,
    // getAllCoursesFromDB,
    // getSingleCourseFromDB,
    // updateCourseIntoDB,
    // deleteCourseFromDB,
    // assignFacultiesWithCourseIntoDB,
    // removeFacultiesFromCourseFromDB,
};