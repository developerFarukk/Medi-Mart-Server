

import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import studentValidationSchema from './student.validation';

// Create student Mathod
const createStudent = async (req: Request, res: Response) => {
    try {
        // const { student: studentData } = req.body;
        // const result = await StudentServices.createStudentIntoDB(studentData);

        const { student: studentData } = req.body;

        const zodParsedData = studentValidationSchema.parse(studentData);

        const result = await StudentServices.createStudentIntoDB(zodParsedData);
        


        res.status(200).json({
            success: true,
            message: 'Student is created succesfully',
            data: result,
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Validation failed',
            error,
        })
    }

};

const getSingleStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student are retrieved succesfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is deleted succesfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,

};