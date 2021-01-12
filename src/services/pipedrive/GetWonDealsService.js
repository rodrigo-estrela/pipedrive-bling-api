const mongoose = require('mongoose');

const Deal = mongoose.model('deals');
const pipedrive = require('../../apis/pipedrive');

class GetWonDealsService {
  async execute() {
    try {
      const deals = await Deal.find({}).select('id');
      const start = deals ? Math.max(...deals.map(deal => deal.id)) : 0;

      const config = {
        params: {
          start,
          status: 'won',
        },
      };

      const response = await pipedrive.get('/deals', config);

      if (!response) return;

      await Deal.insertMany(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = GetWonDealsService;
