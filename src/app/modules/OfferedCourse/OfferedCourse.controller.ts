
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./OfferedCourse.service";


// Create Offer Cource
const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(
        req.body,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Course is created successfully !',
        data: result,
    });
});


// All Offer Cource
const getAllOfferedCourses = catchAsync(
    async (req, res) => {
        const result =
            await OfferedCourseServices.getAllOfferedCoursesFromDB(
                req.query,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'All Offer Course Get successfully !',
            data: result,
        });
    },
);

// Single Offer Course
const getSingleOfferedCourses = catchAsync(
    async (req, res) => {
        const { id } = req.params;

        const result =
            await OfferedCourseServices.getSingleOfferedCourseFromDB(
                id,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single Offer Course Get successfully',
            data: result,
        });
    },
);

// Update Offer Course
const updateOfferedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
        id,
        req.body,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourse updated successfully',
        data: result,
    });
});

// Delete Offer Course
const deleteOfferedCourseFromDB = catchAsync(
    async ( req , res ) => {
        const { id } = req.params;
        const result = await OfferedCourseServices.deleteOfferedCourseFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'OfferedCourse deleted successfully',
            data: result,
        });
    },
);



export const OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourses,
    updateOfferedCourse,
    deleteOfferedCourseFromDB,
};