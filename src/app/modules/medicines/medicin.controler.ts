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


export const BicycleControllers = {
    createMedicin
};