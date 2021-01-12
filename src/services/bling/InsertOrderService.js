const mongoose = require('mongoose');

const bling = require('../../apis/bling');
const CreateDealXMLService = require('./CreateDealXMLService');

const Deal = mongoose.model('deals');

async function postOrderToBling(xml) {
  const config = {
    'Content-Type': 'application/xml',
    params: {
      xml,
    },
  };

  const {
    data: { retorno },
  } = await bling.post('/pedido/json', null, config);

  if (retorno && retorno.erros) return undefined;

  return retorno;
}

class InsertOrderService {
  async execute() {
    const createDealXML = new CreateDealXMLService();

    const dealsJSON = await Deal.find({ bling_posted: false }).limit(100);

    if (dealsJSON.length === 0) return;

    const placedOrders = await Promise.all(
      dealsJSON.map(async deal => {
        const xml = createDealXML.execute(deal);

        const response = await postOrderToBling(xml);

        if (response) return deal.id;

        return undefined;
      }),
    );

    await Deal.updateMany(
      { id: { $in: placedOrders } },
      { bling_posted: true },
    );
  }
}

module.exports = InsertOrderService;
