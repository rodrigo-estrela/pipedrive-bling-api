const mongoose = require('mongoose');

const { Schema } = mongoose;

const dealSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  value: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  org_name: { type: String, required: true },
  bling_posted: { type: Boolean, require: true, default: false },
});

mongoose.model('deals', dealSchema);

module.exports = dealSchema;
