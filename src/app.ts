
// // /* eslint-disable no-undef */
// // /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// // /* eslint-disable @typescript-eslint/no-explicit-any */
// import cors from 'cors';
// import express, { Application, Request, Response } from 'express';
// import globalErrorHandler from './app/middlewares/globalErrorhandler';
// import notFound from './app/middlewares/notFound';
// import router from './app/routes';

// const app: Application = express();

// //parsers
// app.use(express.json());
// app.use(cors());

// // application routes
// app.use('/api/v1', router);

// const test = (req: Request, res: Response) => {
//     const a = 10;
//     res.send(a);
// };

// // app.get('/', (req: Request, res: Response) => {
// //     res.send({
// //         status: true,
// //         message: 'Univercity Management System Server is runing Live ⚡',
// //     })
// // })

// // app.get('/', test);

// app.use(globalErrorHandler);

// //Not Found
// app.use(notFound);

// export default app;


//    ************************************************************************************

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);

// const getAController = (req: Request, res: Response) => {
//     const a = 10;
//     res.send(a);
// };


const getAController = (req: Request, res: Response) => {
    res.send({
                status: true,
                message: 'Univercity Management Systen Server is Runing Live ⚡',
            })
    }

app.get('/', getAController);

export default app;