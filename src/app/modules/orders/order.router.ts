
import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { OrderController } from './order.controller';


const router = express.Router();


// Create order Route
router.post(
    '/create-order',
    auth(USER_ROLE.customer),
    // validateRequest(OrderValidations.createOrderValidationSchema),
    OrderController.createOrder,
);



export const OrderRoutes = router;