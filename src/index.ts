import bodyParser from 'body-parser';
import express from 'express';
import {serve, setup} from 'swagger-ui-express'

import { RegisterRoutes } from '../build/routes';
import SwaggerDocumment from '../build/swagger.json';
import config from './shared/configs/api.config';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api-docs', serve, setup(SwaggerDocumment) );

RegisterRoutes(app);

const server = app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${config.port}`);
});
server.on('error', console.error);
