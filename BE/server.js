const express = require('express');
const { StatusCodes } = require('http-status-codes');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const rapMessage = (res, code, message, data = {}) => {
  res.status(code).send({ message, ...data });
};

app.get('/api/get', (req, res) => {  
  rapMessage(res, StatusCodes.OK, 'Hello, World! (GET)');  
});

app.post('/guards/post', (req, res) => {
  const { body } = req;
  rapMessage(res, StatusCodes.OK, 'Hello, World! (POST)',{ ...body });  
});

app.put('/api/put', (req, res) => {
  rapMessage(res, StatusCodes.OK, 'Hello, World! (PUT)');  
});

const PORT = process.env.EXPORT_PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
