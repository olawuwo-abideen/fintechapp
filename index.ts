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
import { swaggerDocs } from "./src/utils/swagger";


const app = express();

swaggerDocs(app);
   
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

app.use('/', UserRouter);
app.use('/', AccountRouter);
app.use('/', TransactionRouter);
app.use('/', AdminRouter);

app.get('/', (req: Request, res: Response) => {
  res.redirect("/api-docs");
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

export default app;
