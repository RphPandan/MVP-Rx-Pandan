// const axios = require('axios');

const controller = {
  test: (req, res) => {
    res.send('hello World!');
  },
  submit: (req, res) => {
    console.log(req.body);
    res.send('hello from submit');
  },
};

module.exports = controller;
