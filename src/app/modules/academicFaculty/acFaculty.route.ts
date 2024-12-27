
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './acFaculty.validation';
import { AcademicFacultyControllers } from './acFaculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Creat faculty Route
router.post(
    '/create-academic-faculty',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(
        AcademicFacultyValidation.createAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.createAcademicFaculty,
);

// Single Data get route
router.get('/:facultyId',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    AcademicFacultyControllers.getSingleAcademicFaculty
);


// Update faculty data
router.patch(
    '/:facultyId',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(
        AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicFaculty,
);

// All data get faculty data
router.get('/',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    AcademicFacultyControllers.getAllAcademicFaculties

);

export const AcademicFacultyRoutes = router;