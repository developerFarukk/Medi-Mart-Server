
import express, { Request, Response } from 'express'


const app = express()

// middleware
app.use(express.json())

// app.use('/api/user', userRouter)
// app.use('/api/tour', tourRouter)

// POST: /api/user/create-user

app.get('/', (req: Request, res: Response) => {
    res.send({
        status: true,
        message: 'Univercity Management Server is Rouning Live ⚡',
    })
})

export default app