const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { controller: saveGuardsController } = require('./src/save-guards-controller');
const { controller: getGuardsController } = require('./src/get-guards-controller');
const { controller: saveShiftController } = require('./src/save-shift-controller');
const { controller: getShiftsController } = require('./src/get-shifts-controller');
const { controller: deactivateShiftsController } = require('./src/deactivate-shift-controller');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/guards', (req, res) => {  
  getGuardsController(req, res);  
});

app.post('/guards', (req, res) => {  
  saveGuardsController(req, res);  
});

app.get('/shifts', (req, res) => {  
  getShiftsController(req, res);  
});

app.post('/shifts', (req, res) => {  
  saveShiftController(req, res);  
});
app.put('/shifts/deactivate/:shiftStation', (req, res) => {  
  deactivateShiftsController(req, res);  
});

const PORT = process.env.EXPORT_PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
