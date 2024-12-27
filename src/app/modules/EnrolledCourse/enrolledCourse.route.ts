
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

// router.patch(
//     '/update-enrolled-course-marks',
//     auth('faculty'),
//     validateRequest(
//         EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
//     ),
//     EnrolledCourseControllers.updateEnrolledCourseMarks,
// );

export const EnrolledCourseRoutes = router;