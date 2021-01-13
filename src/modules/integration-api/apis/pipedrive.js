const axios = require('axios');

const config = require('./config');

const pipedrive = axios.create({
  baseURL: config.pipedrive.baseURL,
  params: {
    api_token: config.pipedrive.api_token,
  },
});

module.exports = pipedrive;
