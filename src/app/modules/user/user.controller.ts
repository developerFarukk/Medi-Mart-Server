import catchAsync from "../../utils/catchAsync";



// Student Create Funtionality
const createUser = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;

    const result = await UserServices.createAdminIntoDB(
        req.file,
        password,
        adminData,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is created succesfully',
        data: result,
    });
});


export const UserControllers = {
    createUser
};