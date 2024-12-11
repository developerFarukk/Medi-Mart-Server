
import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

// All Admin Data Get
router.get('/', AdminControllers.getAllAdmins);



export const AdminRoutes = router;
