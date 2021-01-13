const pipedrive = require('../../apis/pipedrive');

const config = require('../../apis/config');

class UpdateBlingPostedDealService {
  async execute(deals) {
    const data = {
      [config.pipedrive.customFields.Bling.key]: 'posted',
    };

    deals.forEach(async deal => {
      await pipedrive.put(`/deals/${deal.id}`, data);
    });
  }
}

module.exports = UpdateBlingPostedDealService;
