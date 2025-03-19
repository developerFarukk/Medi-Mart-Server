

import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidations } from './review.validation';
import { reviewController } from './review.controller';

const router = express.Router();


// Create order Route
router.post(
    '/create-review',
    auth(USER_ROLE.customer),
    validateRequest(reviewValidations.createReviewValidationSchema),
    reviewController.createReview,
);

export const ReviewRoutes = router;