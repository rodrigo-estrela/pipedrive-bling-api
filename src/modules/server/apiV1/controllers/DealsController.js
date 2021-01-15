const mongoose = require('mongoose');

const ConsolidatedDeals = mongoose.model('consolidatedDeals');

class DealsController {
  async list(request, response) {
    const { skip, limit } = request.query;

    const deals = await ConsolidatedDeals.find().skip(skip).limit(limit);

    return response.status(200).json(deals);
  }
}

module.exports = DealsController;
