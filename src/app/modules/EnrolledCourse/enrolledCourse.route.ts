
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validaton';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Create Enrole Router
router.post(
    '/create-enrolled-course',
    auth(USER_ROLE.student),
    validateRequest(
        EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
    ),
    EnrolledCourseControllers.createEnrolledCourse,
);

// Update Enrole router
router.patch(
    '/update-enrolled-course-marks',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    validateRequest(
        EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
    ),
    EnrolledCourseControllers.updateEnrolledCourseMarks,
);

// Get Enroll Cource of Student
router.get(
    '/my-enrolled-courses',
    auth(USER_ROLE.student),
    EnrolledCourseControllers.getMyEnrolledCourses,
);

export const EnrolledCourseRoutes = router;