const { format } = require('date-fns');

const pipedrive = require('../../apis/pipedrive');
const config = require('../../apis/config');

class GetWonDealsService {
  async execute() {
    const options = {
      params: {
        filter_id: config.pipedrive.filters.dealsWonBlingNotPosted,
        status: 'won',
      },
    };

    const response = await pipedrive.get('/deals', options);

    if (!response || !response.data || !response.data.data) {
      return undefined;
    }

    const deals = response.data.data.map(deal => ({
      id: deal.id,
      title: deal.title,
      value: deal.value,
      currency: deal.currency,
      status: deal.status,
      won_time: format(new Date(deal.won_time), 'yyy-MM-dd'),
      org_name: deal.org_name,
    }));

    return deals;
  }
}

module.exports = GetWonDealsService;
