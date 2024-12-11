import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";
import { any } from "zod";


// All Admin Data get
const getAllAdmins = catchAsync(async (req, res) => {
    const result = await AdminServices.getAllAdminsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admins are retrieved succesfully',
        data: result,
    });
});


// Single Admin Data Get
const getSingleAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is retrieved succesfully',
        data: result,
    });
});


// Delete Admin Single Function
const deleteAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await AdminServices.deleteAdminFromDB( id );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is deleted succesfully',
        data: result,
    });
});

export const AdminControllers = {
    getAllAdmins,
    getSingleAdmin,
    deleteAdmin,
    // updateAdmin,
};