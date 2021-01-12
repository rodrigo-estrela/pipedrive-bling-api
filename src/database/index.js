const mongoose = require('mongoose');

const keys = require('../config/keys');
require('../models/Deals');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
