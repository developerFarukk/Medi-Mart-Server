
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Creat semister register route
router.post(
    '/create-semester-registration',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(
        SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.createSemesterRegistration,
);

// All Semister register route
router.get('/', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    SemesterRegistrationController.getAllSemesterRegistrations
);

// Single Semister Route
router.get('/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    SemesterRegistrationController.getSingleSemesterRegistration,
);

// Update Semister Route
router.patch('/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(
        SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.updateSemesterRegistration,
);

// Delete Semister Reg Route
router.delete(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    SemesterRegistrationController.deleteSemesterRegistration,
);


export const semesterRegistrationRoutes = router;