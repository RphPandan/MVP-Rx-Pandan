// const axios = require('axios');

const controller = {
  test: (req, res) => {
    console.log(req.url);
    res.send('hello World!');
  },
};

module.exports = controller;
