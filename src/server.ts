import './database'
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors'
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import './shared/container'
import { AppError } from './errors/appError';

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router)


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({message: err.message})
    } 
        return res.status(500).json({message: 'Internal server error - ' + err.message,status: 'error'})
    
})


app.listen(3333, () => console.log("Server is running on port 3333"));

