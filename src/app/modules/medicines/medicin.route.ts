
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { MedicinValidation } from './medicine.validation';
import { MedicinControllers } from './medicin.controler';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();


// Create medicin Route
router.post(
    '/create-medicin',
    auth(USER_ROLE.admin),
    validateRequest(MedicinValidation.medicinValidationSchema),
    MedicinControllers.createMedicin
);


// get all medicin Route
router.get(
    '/',
    MedicinControllers.getAllMedicin
);


// Update medicin Route
router.patch(
    '/:medicinId',
    auth(USER_ROLE.admin),
    validateRequest(MedicinValidation.updatemedicinValidationSchema),
    MedicinControllers.updateMedicin
);

// delete medicin Route
router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    MedicinControllers.deleteMedicin
);

// Get Single medicin Route
router.get(
    '/:id',
    // auth(USER_ROLE.admin),
    MedicinControllers.getSingleMedicin
);



export const MedicinRoutes = router;