import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { MedicinServices } from "./medicin.service";
import sendResponse from "../../utils/sendResponse";



// Creat Bicycle Function
const createMedicin = catchAsync(async (req, res) => {
    const result = await MedicinServices.createMedicinIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medicin is created succesfully',
        data: result,
    });
});


// Get All Medicin
const getAllMedicin = catchAsync(async (req, res) => {

    const result = await MedicinServices.getAllMedicinIntoDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Medicin Data get successfully',
        data: result,
    });

});


// Update Medicin
const updateMedicin = catchAsync(async (req, res) => {

    const { medicinId } = req.params;
    const result = await MedicinServices.updateMedicinIntoDB(medicinId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medicin is updated succesfully',
        data: result,
    });
});


// delete Medicin
const deleteMedicin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MedicinServices.deleteMedicinFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Medicin is deleted succesfully',
        data: result,
    });
});


// delete Medicin
const getSingleMedicin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await MedicinServices.getSingleMedicinFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Medicin get succesfully',
        data: result,
    });
});


export const MedicinControllers = {
    createMedicin,
    getAllMedicin,
    updateMedicin,
    deleteMedicin,
    getSingleMedicin
};