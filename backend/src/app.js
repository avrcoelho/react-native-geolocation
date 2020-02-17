import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.express = express();
    this.server = http.Server(this.express);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(helmet());
    this.express.use(cors());
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().server;
