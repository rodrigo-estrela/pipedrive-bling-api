const { Router } = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const DealsController = require('../controllers/DealsController');

const dealsController = new DealsController();
const dealsRouter = Router();

const getDealsQuerySchema = Joi.object({
  skip: Joi.number().integer().default(0),
  limit: Joi.number().integer().default(100),
});

dealsRouter.get(
  '/',
  validator.query(getDealsQuerySchema),
  dealsController.list,
);

module.exports = dealsRouter;
