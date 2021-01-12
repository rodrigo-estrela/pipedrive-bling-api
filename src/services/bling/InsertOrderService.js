const mongoose = require('mongoose');

const bling = require('../../apis/bling');
const CreateDealXMLService = require('./CreateDealXMLService');

const Deal = mongoose.model('deals');

class PostDealsService {
  async execute() {
    const dealsJSON = await Deal.find({ bling_posted: false });

    const createDealXML = new CreateDealXMLService();

    const dealsXML = dealsJSON.map(async deal => {
      const xml = createDealXML.execute(deal);
      const config = {
        'Content-Type': 'application/xml',
        params: {
          xml,
        },
      };
      const response = await bling.post('/pedido', null, config);
    });
  }
}

module.exports = PostDealsService;
