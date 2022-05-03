const express = require('express');

const cors = require('cors');
const router = require('./router');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(router);
app.use(express.json());

app.get('/test', (req, res) => {
  res.send('hello world!');
});

const port = process.env.EXPORT || 2022;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
