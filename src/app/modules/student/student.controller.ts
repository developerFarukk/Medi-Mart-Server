

import { Request, Response } from 'express';
import { StudentServices } from './student.service';
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

const getAllStudents = async (
    req: Request,
    res: Response,
) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        res.status(200).send({
            status: true,
            message: 'Student Data getting successfully',
            Data: result,
        })
    } catch (error: unknown) {
        res.status(404).json({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred",
        });
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.studentId;

        const result = await StudentServices.getSingleStudentFromDB(studentId);

        // const bikId = req.params.bikId

        // const result = await bikService.getSinglBik(bikId)

        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            Data: result,
        });
    } catch (error: unknown) {
        res.status(404).json({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred",
        });
    }
};

const deleteStudent = async (
    req: Request,
    res: Response,
) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);

        res.status(200).json({
            success: true,
            message: 'Student is Delated succesfully',
            Data: result,
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Validation failed',
            error,
        })
    }
};

const updateStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.studentId
        const body = req.body
        const result = await StudentServices.updateStudent(studentId, body)

        res.status(200).json({
            success: true,
            message: 'Student Data Updated succesfully',
            Data: result,
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Validation failed',
            error,
        })
    }
}

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent

};