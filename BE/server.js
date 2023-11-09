const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { controller: saveGuardsController } = require('./src/save-guards-controller');
const { controller: getGuardsController } = require('./src/get-guards-controller');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/guards', (req, res) => {  
  getGuardsController(req, res);  
});

app.post('/guards', (req, res) => {  
  saveGuardsController(req, res);  
});

const PORT = process.env.EXPORT_PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
