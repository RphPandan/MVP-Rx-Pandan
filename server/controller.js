/* eslint-disable camelcase */
// const axios = require('axios');
const { Rx } = require('../mongoose/index');

const controller = {
  test: (req, res) => {
    res.send('hello World!');
  },
  retrieveAll: (req, res) => {
    Rx.find({})
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  submit: (req, res) => {
    const {
      active_ingredients, dosage,
      directions, frequency, quantity,
      rxcui, pharm_class,
    } = req.body;
    Rx.findOneAndUpdate(
      { active_ingredients },
      req.body,
      { upsert: true, timestamps: true, runValidators: true }
    ).then((result) => {
      console.log(result);
      res.send(result);
    })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
    // res.send('hello from submit');
  },
  updateOne: (req, res) => {
    res.send('hello from updateOne');
  },
  deleteAll: (req, res) => {
    Rx.deleteMany({})
      .then((result) => {
        console.log(result);
        res.send('deleted all documents', result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  deleteOne: (req, res) => {
    Rx.delete({})
      .then((result) => {
        console.log(result);
        res.send('deleted all documents', result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('error in deleting documents', err);
      });
  },
};

module.exports = controller;
