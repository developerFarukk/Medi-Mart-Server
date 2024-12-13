
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";


// Create semister registation
const createSemesterRegistration = catchAsync(
    async (req, res) => {
        const result =
            await SemesterRegistrationService.createSemesterRegistrationIntoDB(
                req.body,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is created successfully!',
            data: result,
        });
    },
);


// All Semister registation
const getAllSemesterRegistrations = catchAsync(
    async (req, res) => {
        const result =
            await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
                req.query,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is retrieved successfully !',
            data: result,
        });
    },
);


// Single semister Reg
const getSingleSemesterRegistration = catchAsync(
    async (req, res) => {
        const { id } = req.params;

        const result =
            await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(
                id,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is retrieved successfully',
            data: result,
        });
    },
);


// Update semister Reg
const updateSemesterRegistration = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result =
            await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
                id,
                req.body,
            );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is updated successfully',
            data: result,
        });
    },
);

// Delete Semister Course
const deleteSemesterRegistration = catchAsync(
    async  (req, res ) => {
        const { id } = req.params;
        const result =
            await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is Deleted successfully',
            data: result,
        });
    },
);


export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration,
};
