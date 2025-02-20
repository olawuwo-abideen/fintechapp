// import "reflect-metadata"
// import express, { Request, Response,NextFunction } from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// import cors from 'cors';
// import DbInitialize from './src/database/init';
// import UserRouter from './src/routers/userRouter';
// import AccountRouter from './src/routers/accountRouter';
// import TransactionRouter from './src/routers/transactionRouter';
// import AdminRouter from "./src/routers/adminRouter";
// // import helmet from 'helmet';
// import compression from 'compression';
// import cookieParser from 'cookie-parser';
// import bodyParser from "body-parser";
// import { swaggerDocs } from "./src/utils/swagger";


// const app = express();

// swaggerDocs(app);
   
// app.use(bodyParser.json());

// app.use(cookieParser());

// app.use(compression());
//  app.use(
//   cors({
//     origin: '*',
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//  })
// );

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use((err: TypeError, req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (err) {
//       return res.status(500).json({ status: false, message: (err as TypeError).message });
//     }
//   } catch (e) {}
// });

// app.use('/', UserRouter);
// app.use('/', AccountRouter);
// app.use('/', TransactionRouter);
// app.use('/', AdminRouter);


// // app.get('/', (req: Request, res: Response) => {
// //   res.send(`Welcome to ${process.env.APPNAME}`);
// // });

// app.get("/", (req: Request, res: Response) => {
//   res.redirect(301, "/api-docs/");
// });

// // app.use(helmet());

// const PORT = process.env.PORT || 3000;

// const Boostrap = async function () {
//   try {
//     await DbInitialize();
//     app.listen(PORT, () => {
//       console.log('Connection has been established successfully.');
//     });
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };
// Boostrap();

// export default app;

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
// import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
// import { swaggerDocs } from "./src/utils/swagger";

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";



// Import the router from the hello.js file


// CDN CSS
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express();

app.use(bodyParser.json()); // to use body object in requests
const PORT = process.env.PORT || 2001;
dotenv.config();

app.use(cookieParser());
app.use(compression());
app.use(cors());


app.use('/', UserRouter);
app.use('/', AccountRouter);
app.use('/', TransactionRouter);
app.use('/', AdminRouter);


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "https://nodejs-swagger-api.vercel.app/",
        description: "My API Documentation",
      },
    ],
  },
  // This is to call all the file
  apis: ["src/**/*.ts"],
};

const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(specs, { customCssUrl: CSS_URL })
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



// Here we are calling the basic html
// Use the router from the hello.js file
// app.use("/", helloRouter);
// Use the router from the post.js file
// app.use("/posts", postRouter);

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
