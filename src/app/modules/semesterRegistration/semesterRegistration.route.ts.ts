
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

// Creat semister register route
router.post(
    '/create-semester-registration',
    validateRequest(
        SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.createSemesterRegistration,
);

// All Semister register route
router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

// Single Semister Route
router.get(
    '/:id',
    SemesterRegistrationController.getSingleSemesterRegistration,
);

// Update Semister Route
router.patch(
    '/:id',
    validateRequest(
        SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.updateSemesterRegistration,
);


export const semesterRegistrationRoutes = router;