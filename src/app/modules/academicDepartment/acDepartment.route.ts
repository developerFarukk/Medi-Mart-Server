
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './acDepartment.validation';
import { AcademicDepartmentControllers } from './acDepartment.controller';


const router = express.Router();

// Creat Academic department Data
router.post(
    '/create-academic-department',
    validateRequest(
        AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.createAcademicDepartmemt,
);


// Single department Data get
router.get(
    '/:departmentId',
    AcademicDepartmentControllers.getSingleAcademicDepartment,
);


// Update department Data
router.patch(
    '/:departmentId',
    validateRequest(
        AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.updateAcademicDeartment,
);


// All Data get of Department
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;