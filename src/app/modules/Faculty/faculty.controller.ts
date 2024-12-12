import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";


// All Faculty Data get
const getAllFaculties = catchAsync(async (req, res) => {

    const result = await FacultyServices.getAllFacultiesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties All data get succesfully',
        data: result,
    });
});

// Single Faculty 
const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrieved succesfully',
        data: result,
    });
});


export const FacultyControllers = {
    getAllFaculties,
    getSingleFaculty,
    // deleteFaculty,
    // updateFaculty,
};