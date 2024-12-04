
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
// import studentValidationSchema from './student.validation';

// Create student Mathod
// const createStudent = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         // console.log("Request Body: ", req.body);

//         const { student: studentData } = req.body;

//         if (!studentData) {
//             throw new Error('Student data is missing from request body');
//         }

//         const zodParsedData = studentValidationSchema.parse(studentData);

//         const result = await StudentServices.createStudentIntoDB(zodParsedData);

//         res.status(200).json({
//             success: true,
//             message: 'Student is created succesfully',
//             data: result,
//         });
//     } catch (err) {
//         next(err);
//     }

// };

const getAllStudents = catchAsync(async (req, res) => {

    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Student Data get successfully',
        data: result,
    });

});


const getSingleStudent = catchAsync(async (req, res) => {

    const studentId = req.params.studentId;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    // const bikId = req.params.bikId

    // const result = await bikService.getSinglBik(bikId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Student data get succesfully',
        data: result,
    });
});


const deleteStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delete Student data succesfully',
        data: result,
    })
});


const updateStudent = catchAsync(async ( req, res ) => {

    const studentId = req.params.studentId
    const body = req.body
    const result = await StudentServices.updateStudent(studentId, body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update Student data succesfully',
        data: result,
    })
});

export const StudentControllers = {
    // createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent
};