

import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidations } from './review.validation';
import { ReviewController } from './review.controller';

const router = express.Router();


// Create order Route
router.post(
    '/create-review',
    auth(USER_ROLE.customer),
    validateRequest(reviewValidations.createReviewValidationSchema),
    ReviewController.createReview,
);


// Delete review Route
router.delete('/:id',
    auth(USER_ROLE.admin),
    ReviewController.deleteReview
);

export const ReviewRoutes = router;