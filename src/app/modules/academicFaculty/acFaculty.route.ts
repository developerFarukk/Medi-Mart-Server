
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './acFaculty.validation';
import { AcademicFacultyControllers } from './acFaculty.controller';

const router = express.Router();

// Creat faculty Route
router.post(
    '/create-academic-faculty',
    validateRequest(
        AcademicFacultyValidation.createAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.createAcademicFaculty,
);

// Single Data get route
// router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

// Update faculty data
router.patch(
    '/:facultyId',
    validateRequest(
        AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicFaculty,
);

// All data get faculty data
router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;