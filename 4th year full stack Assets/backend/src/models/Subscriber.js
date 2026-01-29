const { Schema, model } = require('mongoose');

const subscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = model('Subscriber', subscriberSchema);
