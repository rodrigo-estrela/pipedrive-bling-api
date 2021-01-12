const axios = require('axios');

const bling = axios.create({
  baseURL: 'https://bling.com.br/Api/v2',
  params: {
    apikey:
      '14ac9083cd83f4b6440d639c982862a2159671474573a31cd45a647018d0567f955089b5',
  },
});

module.exports = bling;
