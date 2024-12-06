
import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);

// All Student date get Route
router.get('/', StudentControllers.getAllStudents);

// Single student data get route
router.get('/:studentId', StudentControllers.getSingleStudent);

// Delete student data get route
router.delete('/:studentId', StudentControllers.deleteStudent);

// Update Route
router.patch(
    '/:studentId',
    validateRequest(updateStudentValidationSchema),
    StudentControllers.updateStudent,
);

// router.put('/:studentId', StudentControllers.updateStudent);



export const StudentRoutes = router;