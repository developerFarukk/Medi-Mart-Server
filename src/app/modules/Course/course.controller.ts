

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";


// Creat Course Function
const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is created succesfully',
        data: result,
    });
});

// All Course data Get
const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course are retrieved successfully',
        data: result,
    });
});


// Single Course Data Get
const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is retrieved succesfully',
        data: result,
    });
});



export const CourseControllers = {
    createCourse,
    getSingleCourse,
    getAllCourses,
    // updateCourse,
    // deleteCourse,
    // assignFacultiesWithCourse,
    // removeFacultiesFromCourse,
};
