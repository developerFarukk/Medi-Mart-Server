
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
// import { StudentRoutes } from './app/modules/student/student.route';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/students', router);

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