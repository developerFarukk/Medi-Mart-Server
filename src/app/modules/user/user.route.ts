
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
const router = express.Router();

// Admin Creat Route
router.post(
    '/create-user',
    // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(UserValidation.userValidationSchema),
    UserControllers.registerUser,
);



export const UserRoutes = router;