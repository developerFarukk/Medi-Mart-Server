
import express from 'express';
const router = express.Router();

// Admin Creat Route
router.post(
    '/create-admin',
    // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
);



export const UserRoutes = router;