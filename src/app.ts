
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1', router);

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

app.use(globalErrorHandler);

export default app;