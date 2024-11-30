
import express from 'express';
import { UserControllers } from './user.controller';

const userRouter = express.Router();

userRouter.post('/create-student', UserControllers.createStudent );

export const UserRoutes = userRouter;