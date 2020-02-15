import express from 'express';

import PointController from './app/controllers/PointController';

const routes = express.Router();

routes.get('/points', PointController.index);
routes.post('/points', PointController.store);

export default routes;
