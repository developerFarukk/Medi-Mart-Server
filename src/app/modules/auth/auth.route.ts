
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';


const router = express.Router();

// Login User Route
router.post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthControllers.loginUser,
);



export const AuthRoutes = router;