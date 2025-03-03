
import express from 'express';
import { BicycleControllers } from './medicin.controler';

const router = express.Router();


// Create Bicycle Route
router.post(
    '/create-medicin',
    // auth(USER_ROLE.admin),
    validateRequest(BicycleValidations.createBicycleValidationSchema),
    BicycleControllers.createMedicin
);




export const MedicinRoutes = router;