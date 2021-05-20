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

// GET Title Banner
app.get('/getTitle/:id', async (req, res) => {
  await axios.get(`http://localhost:3001/getTitle/${req.params.id}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error with GET request to server: titles', err.address);
      res.status(404).end();
    });
});

// POST Title Banner
app.post('/postTitle', async (req, res) => {
  await axios.post(`http://localhost:3001/postTitle`, {
    title: req.body.title,
    enrolled: req.body.enrolled,
    reviewcounts: req.body.reviewcounts,
    stars: req.body.stars,
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error with POST request to server: titles', err.address);
      res.status(404).end();
    });
});

// PUT Title Banner
app.put('/updateTitle/:id', async (req, res) => {
  await axios.put(`http://localhost:3001/updateTitle/${req.params.id}`, {
    title: req.body.title,
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error with PUT request to server: titles', err.address);
      res.status(404).end();
    });
});

// DELETE Title Banner
app.delete('/deleteTitle/:id', async (req, res) => {
  await axios.delete(`http://localhost:3001/deleteTitle/${req.params.id}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error with DELETE request to server: titles', err.address);
      res.status(404).end();
    });
});


// Server Connection
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT} 😀!`);
});
