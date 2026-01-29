const { Schema, model } = require('mongoose');

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model('Client', clientSchema);
