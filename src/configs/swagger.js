import swaggerAutogen from 'swagger-autogen';
import { NODE_ENV } from './constants';
const doc = {
  info: {
    title: 'API for Real Estate APP',
    version: '1.0.0',
    description: 'API for Real Estate APP',
  },
  host: `localhost:${NODE_ENV.PORT}`,
  basePath: '/api/v1',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Estate Api',
      description: 'Endpoints',
    },
  ],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
};
const outputFile = './swagger_output.js';
const endpointsFiles = ['../routers/index.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
