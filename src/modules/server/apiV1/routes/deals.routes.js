const { Router } = require('express');

const DealsController = require('../controllers/DealsController');

const dealsController = new DealsController();
const dealsRouter = Router();

dealsRouter.get('/', dealsController.create);

module.exports = dealsRouter;
