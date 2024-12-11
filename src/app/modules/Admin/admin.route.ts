
import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

// All Admin Data Get
router.get('/', AdminControllers.getAllAdmins);

// Single Admin data get route
router.get('/:id', AdminControllers.getSingleAdmin);



export const AdminRoutes = router;
