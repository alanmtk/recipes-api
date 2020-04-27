const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const volleyball = require('volleyball');
const recipesRoutes = require('./routes/api/recipes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(volleyball);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to recipes API! 🥗' });
});

app.use('/recipes', recipesRoutes);

module.exports = app;
