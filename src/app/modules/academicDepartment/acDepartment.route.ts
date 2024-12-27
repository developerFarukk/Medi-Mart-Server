
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './acDepartment.validation';
import { AcademicDepartmentControllers } from './acDepartment.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';


const router = express.Router();

// Creat Academic department Data
router.post(
    '/create-academic-department',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(
        AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.createAcademicDepartmemt,
);


// Single department Data get
router.get(
    '/:departmentId',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    AcademicDepartmentControllers.getSingleAcademicDepartment,
);


// Update department Data
router.patch(
    '/:departmentId',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(
        AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.updateAcademicDeartment,
);


// All Data get of Department
router.get('/',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    AcademicDepartmentControllers.getAllAcademicDepartments
);

export const AcademicDepartmentRoutes = router;