const { Router } = require('express');
const salesRouter = require('./sales.routes');

const routes = Router();

routes.use('/sales', salesRouter);
routes.use('/', (req, res) => {
  return res
    .status(200)
    .json({ status: 'success', message: 'The server is live' });
});

module.exports = routes;
