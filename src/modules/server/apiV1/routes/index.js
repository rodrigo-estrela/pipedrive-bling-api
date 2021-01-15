const { Router } = require('express');
const dealsRouter = require('./sales.routes');

const routes = Router();

routes.use('/sales', dealsRouter);

routes.use('/', (req, res) => {
  return res
    .status(200)
    .json({ status: 'success', message: 'The server is live' });
});

module.exports = routes;
