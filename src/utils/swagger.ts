// import swaggerJsDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { Express } from 'express';

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
//         description: 'Local server',
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
// };

// const swaggerSpec = swaggerJsDoc(options);

// export const swaggerDocs = (app: Express): void => {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,
//     {
//       swaggerOptions: {
//         persistAuthorization: true
//       },
//     }
//   ));
// };





import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fintech API',
      version: '1.0.0',
      description: 'Backend to a Fintech API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routers/*.ts'],
};

const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app: Express): void => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { persistAuthorization: true },
  }));
};
