const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// GET endpoint
app.get('/api/get', (req, res) => {
    res.send('Hello, World! (GET)');
});

// POST endpoint
app.post('/api/post', (req, res) => {
    res.send('Hello, World! (POST)');
});

// PUT endpoint
app.put('/api/put', (req, res) => {
    res.send('Hello, World! (PUT)');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
