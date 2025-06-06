import express from "express"
import dotenv from "dotenv"
// import 'dotenv/config';
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import userRouter from './routes/user.routes.js'
import applicationRouter from './routes/application.routes.js'
import jobRouter from './routes/job.routes.js'
import { dbConnection } from "./database/db.js"
import { errorMiddleware } from "./middlewares/error.js"
import morgan from "morgan"

const app = express()
dotenv.config({path: './config/config.env'})

app.use(
    cors({
      origin: [process.env.FRONTEND_URL],  
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}))

app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);

dbConnection()

app.use(errorMiddleware)

export default app;