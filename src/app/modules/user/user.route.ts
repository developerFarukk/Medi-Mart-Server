
import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';

const userRouter = express.Router();

// Student Create Route
userRouter.post(
    '/create-student',
    validateRequest(createStudentValidationSchema),
    UserControllers.createStudent,
);

export const UserRoutes = userRouter;