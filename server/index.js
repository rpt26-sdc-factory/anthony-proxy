require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));


// LOADER IO
const loaderIO_URL = `/${process.env.LOADERIO}` || '';
app.get(loaderIO_URL, (req, res) => {
  try {
    res.sendFile(path.resolve(__dirname, `../loader-io.txt`));
  } catch (err) {
    console.error(err);
  }
});

// React app
app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// GET Title Banner
app.get('/getTitle/:id', async (req, res) => {
  await axios.get(`http://54.210.167.109:3001/getTitle/${req.params.id}`)
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
  await axios.post(`http://54.210.167.109:3001/postTitle`, {
    title: req.body.title,
    enrolled: req.body.enrolled,
    reviewcounts: req.body.reviewcounts,
    stars: req.body.stars,
    offeredby: req.body.offeredby
  })
    .then((response) => {
      console.log(response.config.data);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error with POST request to server: titles', err.address);
      res.status(404).end();
    });
});

// PUT Title Banner
app.put('/updateTitle/:id', async (req, res) => {
  await axios.put(`http://54.210.167.109:3001/updateTitle/${req.params.id}`, {
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
  await axios.delete(`http://54.210.167.109:3001/deleteTitle/${req.params.id}`)
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
  console.log(`Proxy listening at port ${PORT} ????!`);
});
