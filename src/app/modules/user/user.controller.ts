
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';


// Student Create Funtionality
const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;

    const result = await UserServices.createAdminIntoDB(password, adminData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});


// Student Create Funtionality
const createStudent = catchAsync(async (req, res) => {

    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(password, studentData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Creat Student and user data is succesfully',
        data: result,
    })
});

export const UserControllers = {
    createStudent,
    createAdmin,
};