const mongoose = require('mongoose');

const keys = require('../config/keys');
require('../models/Deals');
require('../models/Sales');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
