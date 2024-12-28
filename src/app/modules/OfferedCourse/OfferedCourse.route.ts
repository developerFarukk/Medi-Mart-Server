

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import { OfferedCourseControllers } from './OfferedCourse.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();


// Create Offer Cource Route
router.post(
    '/create-offered-course',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
    OfferedCourseControllers.createOfferedCourse,
);

// All Offer Cource Route
router.get('/',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    OfferedCourseControllers.getAllOfferedCourses
);

// Single Offer Course Route
router.get('/:id',
    auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    OfferedCourseControllers.getSingleOfferedCourses
);

// Update Offer Course Route
router.patch(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
    OfferedCourseControllers.updateOfferedCourse,
);

// Delete Offer Course Route
router.delete(
    '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    OfferedCourseControllers.deleteOfferedCourseFromDB,
);

// Get Me Offer Course by Student
router.get(
    '/my-offered-courses/ami',
    auth(USER_ROLE.student),
    OfferedCourseControllers.getMyOfferedCourses,
);

export const offeredCourseRoutes = router;

