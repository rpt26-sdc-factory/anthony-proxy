require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// Server Connection
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT} 😀!`);
});
