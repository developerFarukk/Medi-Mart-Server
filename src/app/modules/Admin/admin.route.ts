
import express from 'express';
import { AdminControllers } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

// All Admin Data Get
router.get('/', AdminControllers.getAllAdmins);

// Single Admin data get route
router.get('/:id', AdminControllers.getSingleAdmin);

// Delete Admin Route
router.delete('/:id', AdminControllers.deleteAdmin);

// Update Admin Route
router.patch(
    '/:id',
    validateRequest(updateAdminValidationSchema),
    AdminControllers.updateAdmin,
);



export const AdminRoutes = router;
