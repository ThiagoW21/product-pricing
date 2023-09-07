const { validateProducts, updateProducts } = require('../services/productsService');

async function validate(req, res) {
  const products = await validateProducts(req.body);

  res.status(200).json(products);
}

async function update(req, res) {
  const productsUpdated = await updateProducts(req.body);

  res.status(200).json(productsUpdated);
}

module.exports = {
  validate,
  update,
};
