
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MedicinValidation } from './medicine.validation';
import { MedicinControllers } from './medicin.controler';

const router = express.Router();


// Create Bicycle Route
router.post(
    '/create-medicin',
    // auth(USER_ROLE.admin),
    validateRequest(MedicinValidation.medicinValidationSchema),
    MedicinControllers.createMedicin
);




export const MedicinRoutes = router;