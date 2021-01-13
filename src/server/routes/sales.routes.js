const mongoose = require('mongoose');
const { Router } = require('express');

const Sales = mongoose.model('sales');
const salesRouter = Router();

salesRouter.get('/', async (request, response) => {
  const sales = await Sales.find();

  return response.status(200).json(sales);
});

module.exports = salesRouter;
