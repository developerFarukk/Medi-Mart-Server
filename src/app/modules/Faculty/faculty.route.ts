
import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

// All Faculty Route
router.get('/', FacultyControllers.getAllFaculties);

// Single Faculty Route
router.get('/:id', FacultyControllers.getSingleFaculty);

// Update Route
router.patch(
    '/:id',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);



export const FacultyRoutes = router;