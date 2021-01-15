const { Router } = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const DealsController = require('../controllers/DealsController');

const dealsController = new DealsController();
const dealsRouter = Router();

const querySchema = Joi.object({
  skip: Joi.number().integer().default(0),
  limit: Joi.number().integer().default(100),
});

dealsRouter.get('/', validator.query(querySchema), dealsController.list);

module.exports = dealsRouter;
