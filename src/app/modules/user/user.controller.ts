
// import httpStatus from 'http-status';

// import { Request, Response } from 'express';
// // import sendResponse from '../../utils/sendResponse';
// import { UserServices } from './user.service';

// const createStudent = async (
//     req: Request,
//     res: Response,
//     // next: NextFunction,
// ) => {
//     try {
//         const { password, student: studentData } = req.body;
//         console.log(studentData);


//         // const zodParsedData = studentValidationSchema.parse(studentData);

//         const result = await UserServices.createStudentIntoDB(
//             password,
//             studentData,
//         );

//         // console.log(UserServices.createStudentIntoDB);




//         res.status(200).json({
//             success: true,
//             message: 'Student is created succesfully',
//             data: result,
//         });
//     } catch (error) {
//         res.json({
//             success: false,
//             message: 'Validation failed',
//             error: error.message || error,
//         })
//     }
// };

// export const UserControllers = {
//     createStudent,
// };






import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { password, student: studentData } = req.body;
        // console.log(req.body);
        
        

        // const zodParsedData = studentValidationSchema.parse(studentData);

        const result = await UserServices.createStudentIntoDB(
            password,
            studentData,
        );

        res.status(200).json({
            success: true,
            message: 'Student is created succesfully',
            data: result,
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Validation failed',
            error: error.message || error,
        })
    }
};

export const UserControllers = {
    createStudent,
};