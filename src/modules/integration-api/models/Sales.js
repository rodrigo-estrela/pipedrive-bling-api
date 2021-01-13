const mongoose = require('mongoose');

const { Schema } = mongoose;

const salesSchema = new Schema({
  date: { type: Date, required: true },
  value: { type: Number, required: true },
});

mongoose.model('sales', salesSchema);

module.exports = salesSchema;
