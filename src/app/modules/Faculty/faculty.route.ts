
import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// All Faculty Route
router.get('/', auth(USER_ROLE.admin, USER_ROLE.faculty), FacultyControllers.getAllFaculties);

// Single Faculty Route
router.get('/:id', FacultyControllers.getSingleFaculty);

// Update Route
router.patch(
    '/:id',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

// Delete Faculty
router.delete('/:id', FacultyControllers.deleteFaculty);



export const FacultyRoutes = router;