// import swaggerJsDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { Express } from 'express';

// const CSS_URL =
//   "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

// const options: swaggerJsDoc.Options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Fintech API',
//       version: '1.0.0',
//       description: 'Backend to a Fintech API documentation',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//         description: 'Fintech API documentation',
//       },
//     ],
//     components: {
//       securitySchemes: {
//         BearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//       },
//     },    
//     // security: [{ BearerAuth: [] }],
//   },
//   apis: ['./src/routers/*.ts']
// };const swaggerSpec = swaggerJsDoc(options);




// export const swaggerDocs = (app: Express): void => {
//   app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerSpec, undefined, {
//       swaggerOptions: {
//         persistAuthorization: true,
//       },
//       customfavIcon: "https://avatars.githubusercontent.com/u/6936373?s=200&v=4",
//       customSiteTitle: "Fintech API Docs",
//       customCssUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
//     })
//   );
// };





import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";


const serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://fintechapp-ff7dubjot-olawuwo-projects.vercel.app"
    : "http://localhost:3000";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fintech API",
      version: "1.0.0",
      description: "Backend to a Fintech API documentation",
    },
    servers: [
      {
        url: serverUrl,
        description: process.env.NODE_ENV === "production" ? "Production Server" : "Local Server",
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
  apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app: Express): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, undefined, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customfavIcon:
        "https://avatars.githubusercontent.com/u/6936373?s=200&v=4",
      customCssUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    })
  );
};


