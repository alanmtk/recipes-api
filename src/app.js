const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.json({message: 'Welcome to recipes API! 🥗'});
});

module.exports = app;
