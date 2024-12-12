
import express from 'express';
import { FacultyControllers } from './faculty.controller';

const router = express.Router();

// All Faculty Route
router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;