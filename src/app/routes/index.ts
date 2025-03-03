
import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { MedicinRoutes } from '../modules/medicines/medicin.route';



const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/medicins',
        route: MedicinRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;