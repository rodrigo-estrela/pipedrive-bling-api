const converter = require('xml-js');

class CreateDealXMLService {
  execute(deal) {
    const formattedDeal = {
      pedido: {
        cliente: {
          nome: deal.org_name,
        },

        itens: {
          item: [
            {
              descricao: deal.title,
              qtde: 1,
              vlr_unit: deal.value,
            },
          ],
        },

        transporte: {
          volumes: {
            volume: {
              servico: '',
            },
          },
        },

        parcelas: {
          parcela: [
            {
              vlr: deal.value,
            },
          ],
        },
      },
    };

    const options = { compact: true, spaces: 4 };
    return converter.js2xml(formattedDeal, options);
  }
}

module.exports = CreateDealXMLService;
