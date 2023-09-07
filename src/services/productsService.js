const db = require('../database/models');

const productsService = {
  getAll: async () => {
    const products = await db.Product.findByPk(1000);

    return products;
  },
};

module.exports = productsService;
