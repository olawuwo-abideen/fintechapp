import "reflect-metadata"
import express, { Request, Response,NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import DbInitialize from './database/init';
import UserRouter from './routers/userRouter';
import AccountRouter from './routers/accountRouter';
import TransactionRouter from './routers/transactionRouter';
import AdminRouter from "./routers/adminRouter";
// import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";


import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// CDN CSS
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express();

app.use(bodyParser.json()); 
const PORT = process.env.PORT || 2001;
dotenv.config();

app.use(cookieParser());
app.use(compression());
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err: TypeError, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err) {
      return res.status(500).json({ status: false, message: (err as TypeError).message });
    }
  } catch (e) {}
});

app.use('/users', UserRouter);
app.use('/accounts', AccountRouter);
app.use('/transactions', TransactionRouter);
app.use('/admin', AdminRouter);



const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fintech API",
      version: "1.0.0",
      description: "A backend to a Fintech API",

    },
    servers: [
      {
        url: "https://fintechapp-dnxa.onrender.com/",
        description: "My Fintech API Documentation",
      },  
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },   
  apis: ["./dist/routers/*.js"]
};

const specs = swaggerJsDoc(options);

app.get("/", (req: Request, res: Response) => {
  res.redirect(301, "");
});

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, {
    customCssUrl: CSS_URL,
    swaggerOptions: {
      persistAuthorization: true, 
    },
  })
);

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
