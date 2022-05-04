const express = require('express');
const bodyParser = require('body-parser');
require('../mongoose/index');

const cors = require('cors');
const router = require('./router');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser());
app.use(express.json());
app.use(router);

// app.get('/test', (req, res) => {
//   res.send('hello world!');
// });

const port = process.env.EXPORT || 2022;
console.log(port);
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
