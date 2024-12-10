
import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/acSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/acFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/acDepartment.route';
import { CourseRoutes } from '../modules/Course/course.route';

const routers = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes,
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },

];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;