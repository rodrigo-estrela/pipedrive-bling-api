const mongoose = require('mongoose');

const AppError = require('../../errors/AppError');

const ConsolidatedDeals = mongoose.model('consolidatedDeals');

class DealsController {
  async list(request, response) {
    let { skip, limit } = request.query;

    if (skip) {
      if (Number.isNaN(parseInt(skip, 10))) {
        throw new AppError('Parameter skip must be a number!');
      }
    }
    skip = parseInt(skip, 10) || 0;

    if (limit) {
      if (Number.isNaN(parseInt(limit, 10))) {
        throw new AppError('Parameter limit must be a number');
      }
    }
    limit = parseInt(limit, 10);
    limit = limit > 100 ? 100 : limit;

    const deals = await ConsolidatedDeals.find().skip(skip).limit(limit);

    return response.status(200).json(deals);
  }
}

module.exports = DealsController;
