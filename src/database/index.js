const mongoose = require('mongoose');

const config = require('../config');

require('../models/Deals');
require('../models/Sales');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
