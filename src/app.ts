

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
// import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
// app.use( cors({ origin: ['http://localhost:5001'] }) );
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5001'], credentials: true }));

// application routes
// app.use('/api/v1', router);


const getAController = (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Medimart Server is Runing Live ⚡',
    })
}

app.get('/', getAController);

// Global Error Handelar
app.use(globalErrorHandler);

//Not Found Page function
app.use(notFound);


export default app;