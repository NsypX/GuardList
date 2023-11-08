const express = require('express');
const { StatusCodes } = require('http-status-codes');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const rapMessage = (res, code, message) => {
  res.status(code).send({ message });
};

app.get('/api/get', (req, res) => {  
  rapMessage(res, StatusCodes.OK, 'Hello, World! (GET)');  
});

app.post('/api/post', (req, res) => {
  rapMessage(res, StatusCodes.OK, 'Hello, World! (POST)');  
});

app.put('/api/put', (req, res) => {
  rapMessage(res, StatusCodes.OK, 'Hello, World! (PUT)');  
});

const PORT = process.env.EXPORT_PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
