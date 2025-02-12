import "reflect-metadata"
import express, { Request, Response,NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import DbInitialize from './src/database/init';
import UserRouter from './src/routers/userRouter';
import AccountRouter from './src/routers/accountRouter';
import TransactionRouter from './src/routers/transactionRouter';
import AdminRouter from "./src/routers/adminRouter";
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "REST API for Swagger Documentation",
      version: "1.0.0",
      description: "A backend to banking app",
    },
    servers: [{ url: "http://localhost:3000/" }],
  },
  apis: [
    './routers/*.ts'
  ],
};
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: '*',
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err: TypeError, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err) {
      return res.status(500).json({ status: false, message: (err as TypeError).message });
    }
  } catch (e) {}
});

app.use('/user', UserRouter);
app.use('/account', AccountRouter);
app.use('/transaction', TransactionRouter);
app.use('/admin', AdminRouter);

app.get('/', (req: Request, res: Response) => {
  res.send(`Welcome to ${process.env.APPNAME}`);
});

const PORT = process.env.PORT || 3000;

const Boostrap = async function () {
  try {
    await DbInitialize();
    app.listen(PORT, () => {
      console.log('Connection has been established successfully.');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
Boostrap();


