require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// Title Banner Routes
app.get('/getTitle/:id', async (req, res) => {
  await axios.get(`http://localhost:3001/getTitle/${req.params.id}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error with GET request to server: images', err.address);
      res.status(404).end();
    });
});

// Server Connection
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT} 😀!`);
});
