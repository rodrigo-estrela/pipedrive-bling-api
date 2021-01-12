const axios = require('axios');

const pipedrive = axios.create({
  baseURL: 'https://rodrigoestrela-sandbox.pipedrive.com/api/v1',
  params: {
    api_token: '2af7e5b906d3097ddc2a0df250569d285ae74c3e',
  },
});

module.exports = pipedrive;
