import Point from '../models/Point';

class PointController {
  async index(req, res) {}

  async store(req, res) {
    const point = await Point.create(req.body);

    return res.json(point);
  }
}

export default new PointController();
