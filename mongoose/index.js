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

const Rx = mongoose.model('rx', new Schema({
}));

module.exports = { mongoose, Rx };
