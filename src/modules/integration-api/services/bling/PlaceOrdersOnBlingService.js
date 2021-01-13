const bling = require('../../apis/bling');
const CreateDealXMLService = require('./CreateDealXMLService');

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

class PlaceOrdersOnBlingService {
  async execute(dealsJSON) {
    const createDealXML = new CreateDealXMLService();

    let placedOrders = await Promise.all(
      dealsJSON.map(async deal => {
        const xml = createDealXML.execute(deal);

        const response = await postOrderToBling(xml);

        if (response) return deal;

        return undefined;
      }),
    );

    placedOrders = placedOrders.filter(order => order !== undefined);

    return placedOrders;
  }
}

module.exports = PlaceOrdersOnBlingService;
