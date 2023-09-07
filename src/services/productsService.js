const db = require('../database/models');
const { validateNewPrice } = require('../helpers/utils');

async function getProductByCode(code) {
  return db.Product.findByPk(code);
}

async function validateProduct(productToValidate) {
  const product = await getProductByCode(productToValidate.product_code);
  
  let validates = { is_valid: false, code: 'PRODUCT_NOT_FOUND' };

  if (!product) {
    return { ...productToValidate, ...validates };
  }

  validates = validateNewPrice(product, productToValidate.new_price);

  return {
    ...productToValidate,
    ...validates,
    sales_price: product.sales_price,
    name: product.name,
  };
}

async function validateProducts(productsToValidate) {
  const products = await Promise.all(productsToValidate.map(validateProduct));

  return products;
}

module.exports = {
  validateProducts,
};
