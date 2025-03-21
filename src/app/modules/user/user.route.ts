
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import { USER_ROLE } from './user.constant';
import auth from '../../middlewares/auth';
const router = express.Router();

// Creat Route
router.post(
    '/create-user',
    validateRequest(UserValidation.userValidationSchema),
    UserControllers.registerUser,
);

// Get all user route
router.get(
    '/',
    auth(USER_ROLE.admin),
    UserControllers.getAllUser
);


// Update User
router.patch(
    '/:userId',
    auth(USER_ROLE.admin),
    validateRequest(UserValidation.UpdateUserValidationSchema),
    UserControllers.updateUser
);

// get Single user
router.get(
    '/singleuser',
    auth(USER_ROLE.admin, USER_ROLE.customer),
    UserControllers.getSingleUser
);



export const UserRoutes = router;