const { Router } = require('express');
const salesRouter = require('./sales.routes');

const routes = Router();

routes.use('/sales', salesRouter);

module.exports = routes;
