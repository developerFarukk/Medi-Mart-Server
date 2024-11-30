
import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const routers = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes ,
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;