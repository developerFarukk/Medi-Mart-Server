
import httpStatus from 'http-status';

// import {  Request, Response } from 'express';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { password, student: studentData } = req.body;

        // const zodParsedData = studentValidationSchema.parse(studentData);

        const result = await UserServices.createStudentIntoDB(
            password,
            studentData,
        );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is created succesfully',
            data: result,
        });

        // res.json({
        //     success: true,
        //     message: 'Bicycle created successfully',
        //     data: result,
        // })
    }
    // catch (error) {
    //     res.json({
    //         success: false,
    //         message: 'Validation failed',
    //         error,
    //     })
    // }
    catch (err) {
        next(err);
        console.log(err);
        
    }
};

export const UserControllers = {
    createStudent,
};