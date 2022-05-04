const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

mongoose.connect(`mongodb://${process.env.MGHOST}:${process.env.MGPORT}/${process.env.MGDB}`)
  .then(() => {
    console.log(`connected to the ${process.env.MGDB}`);
  })
  .catch(() => {
    console.log('could not connect to mongoose');
  });

const RxSchema = new Schema({
  active_ingredients: {
    type: String,
    unique: true,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    minlength: 8,
    lowercase: true,
    trim: true,
    required: true,
  },
  frequency: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rxcui: {
    type: Array,
    required: true,
  },
  pharm_class: {
    type: Array,
    required: true,
  },
  adherence: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Rx = mongoose.model('rx', RxSchema, 'Rx');

module.exports = { mongoose, Rx };
