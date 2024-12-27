
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './acSemester.controller';
import { AcademicSemesterValidations } from './acSemester.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

// Create Academic semister 
router.post(
    '/create-academic-semester',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(
        AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.createAcademicSemester,
);

// Single Academic semister dara get
router.get(
    '/:semesterId',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    AcademicSemesterControllers.getSingleAcademicSemester,
);


// Update academic semister data
router.patch(
    '/:semesterId',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(
        AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
);

// All academic semister data get
router.get('/',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    AcademicSemesterControllers.getAllAcademicSemesters
);

export const AcademicSemesterRoutes = router;