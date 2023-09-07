const db = require("../database/models");
const { validateNewPrice, newError } = require("../helpers/utils");

async function getProductByCode(code) {
  return db.Product.findByPk(code);
}

async function getPacksByProductCode(code) {
  return db.Pack.findAll({ where: { product_id: code } });
}

async function validateProduct(productToValidate) {
  const product = await getProductByCode(productToValidate.product_code);

  let validates = { is_valid: false, code: "PRODUCT_NOT_FOUND" };

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

async function updateProductPack(transaction, product, pack) {
  const { oldPrice, new_price: newPrice } = product;

  const productPack = await getProductByCode(pack.pack_id);

  const productQuantity = pack.qty;

  const oldProductTotal = oldPrice * productQuantity;
  const newProductTotal = newPrice * productQuantity;

  const newSalesPrice =
    productPack.sales_price - oldProductTotal + newProductTotal;

  await db.Product.update(
    { sales_price: newSalesPrice },
    { where: { code: pack.pack_id } },
    { transaction }
  );
}

async function updateProductsPacks(transaction, product) {
  const packs = await getPacksByProductCode(product.product_code);

  await Promise.all(
    packs.map((pack) => updateProductPack(transaction, product, pack))
  );
}

async function updateProductWithTransaction(product) {
  const { product_code: code, new_price: newPrice } = product;

  try {
    await db.sequelize.transaction(async (t) => {
      await db.Product.update(
        { sales_price: newPrice },
        { where: { code } },
        { transaction: t }
      );

      await updateProductsPacks(t, product);
    });
    return product;
  } catch (error) {
    throw newError("Unknown error", "BadRequest", 400);
  }
}

async function updateProduct(productToUpdate) {
  const productInDb = await getProductByCode(productToUpdate.product_code);

  if (!productInDb) {
    throw newError(
      "One or more products cannot be found to update",
      "BadRequest",
      400
    );
  }

  const product = { ...productToUpdate, oldPrice: productInDb.sales_price };

  const { is_valid: isValid } = validateNewPrice(
    productInDb,
    product.new_price
  );

  if (!isValid) {
    throw newError(
      "One or more products have invalid prices",
      "BadRequest",
      400
    );
  }

  return updateProductWithTransaction(product);
}

async function updateProducts(productsToUpdate) {
  const productsUpdated = await Promise.all(
    productsToUpdate.map(updateProduct)
  );

  return productsUpdated;
}

module.exports = {
  validateProducts,
  updateProducts,
};
