
import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/acSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/acFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/acDepartment.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route.ts';

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/admins',
        route: AdminRoutes,
    },
    {
        path: '/faculties',
        route: FacultyRoutes,
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
    {
        path: '/semester-registrations',
        route: semesterRegistrationRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;