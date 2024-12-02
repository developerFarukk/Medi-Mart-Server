

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);


const getAController = (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Univercity Management Systen Server is Runing Live ⚡',
    })
}

app.get('/', getAController);

// Global Error Handelar
app.use(globalErrorHandler);

//Not Found Page
app.use(notFound);


export default app;