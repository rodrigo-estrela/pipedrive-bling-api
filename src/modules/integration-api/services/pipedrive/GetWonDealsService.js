const mongoose = require('mongoose');
const { format } = require('date-fns');

const Deal = mongoose.model('deals');
const pipedrive = require('../../apis/pipedrive');

class GetWonDealsService {
  async execute() {
    const deals = await Deal.find({});
    const start = deals ? Math.max(...deals.map(deal => deal.id)) : 0;

    const config = {
      params: {
        start,
        status: 'won',
      },
    };

    const response = await pipedrive.get('/deals', config);

    if (!response || !response.data || !response.data.data) {
      console.info('No new won deals');
      return;
    }

    const dealsToBeAdded = response.data.data.map(deal => ({
      id: deal.id,
      title: deal.title,
      value: deal.value,
      currency: deal.currency,
      status: deal.status,
      won_time: format(new Date(deal.won_time), 'yyy-MM-dd'),
      org_name: deal.org_name,
    }));

    await Deal.insertMany(dealsToBeAdded);
  }
}

module.exports = GetWonDealsService;
