
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MedicinValidation } from './medicine.validation';
import { MedicinControllers } from './medicin.controler';

const router = express.Router();


// Create medicin Route
router.post(
    '/create-medicin',
    // auth(USER_ROLE.admin),
    validateRequest(MedicinValidation.medicinValidationSchema),
    MedicinControllers.createMedicin
);


// get medicin Route
router.get(
    '/',
    // auth(USER_ROLE.admin),
    MedicinControllers.getAllMedicin
);




export const MedicinRoutes = router;