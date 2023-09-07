const { validateProducts } = require('../services/productsService');

async function validate(req, res) {
  const products = await validateProducts(req.body);

  res.status(200).json(products);
}

module.exports = {
  validate,
};
