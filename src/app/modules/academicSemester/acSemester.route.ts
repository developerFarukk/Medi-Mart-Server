
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './acSemester.controller';
import { AcademicSemesterValidations } from './acSemester.validation';

const router = express.Router();

// Create Academic semister 
router.post(
    '/create-academic-semester',
    validateRequest(
        AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.createAcademicSemester,
);

// Single Academic semister dara get
router.get(
    '/:semesterId',
    AcademicSemesterControllers.getSingleAcademicSemester,
);


// Update academic semister data
router.patch(
    '/:semesterId',
    validateRequest(
        AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
);

// All academic semister data get
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router;