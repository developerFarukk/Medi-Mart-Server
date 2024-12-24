
import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

// Create Course Route
router.post(
    '/create-course',
    auth(USER_ROLE.admin),
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse,
);

// All Course data get route
router.get('/', CourseControllers.getAllCourses);

// Single Course Data get Route
router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty), CourseControllers.getSingleCourse);

// Delete Course Route
router.delete('/:id', auth(USER_ROLE.admin), CourseControllers.deleteCourse);

// Update Course Route
router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    validateRequest(CourseValidations.updateCourseValidationSchema),
    CourseControllers.updateCourse,
);

// Assin Course Faculty Route
router.put(
    '/:courseId/assign-faculties',
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.assignFacultiesWithCourse,
);

// Remove Course faculty Route
router.delete(
    '/:courseId/remove-faculties',
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.removeFacultiesFromCourse,
);


export const CourseRoutes = router;