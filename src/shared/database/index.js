const mongoose = require('mongoose');

const config = require('../../config');

require('../../modules/integration-api/models/Deals');
require('../../modules/integration-api/models/Sales');

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(error => {
    console.error(error);
    throw new Error('Unable to connect MongoDB');
  });
