const axios = require('axios');

const config = require('./config');

const bling = axios.create({
  baseURL: config.bling.baseURL,
  params: {
    apikey: config.bling.apikey,
  },
});

module.exports = bling;
