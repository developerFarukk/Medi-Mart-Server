
import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { MedicinRoutes } from '../modules/medicines/medicin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { OrderRoutes } from '../modules/orders/order.router';
import { ReviewRoutes } from '../modules/review/review.router';



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
    {
        path: '/orders',
        route: OrderRoutes,
    },
    {
        path: '/review',
        route: ReviewRoutes,
    },
    // {
    //     path: '/ssl',
    //     route: SSLRoutes,
    // },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;