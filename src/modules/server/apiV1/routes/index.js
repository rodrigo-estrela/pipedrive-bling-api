const { Router } = require('express');
const dealsRouter = require('./deals.routes');

const routes = Router();

routes.get('/', (req, res) => {
  return res
    .status(200)
    .json({ status: 'success', message: 'The server is live' });
});

routes.use('/deals', dealsRouter);

module.exports = routes;
