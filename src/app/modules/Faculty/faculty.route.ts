
import express from 'express';
import { FacultyControllers } from './faculty.controller';

const router = express.Router();

// All Faculty Route
router.get('/', FacultyControllers.getAllFaculties);

// Single Faculty Route
router.get('/:id', FacultyControllers.getSingleFaculty);


export const FacultyRoutes = router;