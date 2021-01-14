const mongoose = require('mongoose');

const { Schema } = mongoose;

const consolidatedDealsSchema = new Schema({
  date: { type: Date, required: true },
  value: { type: Number, required: true },
});

mongoose.model('consolidatedDeals', consolidatedDealsSchema);

module.exports = consolidatedDealsSchema;
