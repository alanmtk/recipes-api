const express = require('express');
const {
  list, get, search, getBest, getWorst, rate,
} = require('../../controllers/recipes');

const router = express.Router();

router.get('/', list);

router.get('/search', search);

router.get('/best', getBest);

router.get('/worst', getWorst);

router.get('/:id', get);

router.post('/:id/rate', rate);

module.exports = router;
