const express = require('express');
const { StatusCodes } = require('http-status-codes');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/api/get', (req, res) => {  
  res.status(StatusCodes.OK).send('Hello, World! (GET)');
});

app.post('/api/post', (req, res) => {
  res.status(StatusCodes.OK).send('Hello, World! (POST)');
});

app.put('/api/put', (req, res) => {
  res.status(StatusCodes.OK).send('Hello, World! (PUT)');
});

const PORT = process.env.EXPORT_PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
