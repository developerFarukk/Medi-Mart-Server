
import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { MedicinRoutes } from '../modules/medicines/medicin.route';
import { AuthRoutes } from '../modules/auth/auth.route';



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