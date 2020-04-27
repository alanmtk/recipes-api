const db = require('../db/client');
const { average } = require('../helpers');

const list = (req, res) => {
  const recipes = db.get('recipes').map(({ id, name, reviews }) => {
    const rate = average(reviews);
    return ({ id, name, rate });
  }).value();

  res.json(recipes);
};

const get = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const recipes = db.get('recipes').map((recipe) => {
    const rate = average(recipe.reviews);
    return ({ ...recipe, rate });
  }).find({ id }).value();

  res.json(recipes);
};

const search = (req, res) => {
  const query = req.query.q;
  const regExp = new RegExp(query, 'i');
  const recipes = db.get('recipes')
    .filter(({ name, ingredients }) => regExp.test(name)
    || ingredients.some(({ name: ingredientName }) => regExp.test(ingredientName)))
    .map(({ id, name, reviews }) => {
      const rate = average(reviews);
      return ({ id, name, rate });
    }).value();

  return res.json(recipes);
};

const getBest = (req, res) => {
  const recipes = db.get('recipes').map((recipe) => {
    const { id, name, reviews } = recipe;
    const rate = average(reviews);
    return ({ id, name, rate });
  }).orderBy('rate', 'desc').value();

  res.json(recipes);
};

const getWorst = (req, res) => {
  const recipes = db.get('recipes').map((recipe) => {
    const { id, name, reviews } = recipe;
    const rate = average(reviews);
    return ({ id, name, rate });
  }).orderBy('rate', 'asc').value();

  res.json(recipes);
};

const rate = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // eslint-disable-next-line no-shadow
  const rate = parseInt(req.body.rate, 10);
  db.get('recipes').find({ id }).get('reviews').push(rate)
    .write();
  const newReviews = db.get('recipes').find({ id }).get('reviews').value();
  const newRate = average(newReviews);

  res.json({ rate: newRate });
};

module.exports = {
  list,
  get,
  search,
  getBest,
  getWorst,
  rate,
};
