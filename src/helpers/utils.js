const PERCENTAGE_RANGE_LIMIT = 0.10;

function validateNewPrice(product, newPrice) {
  const { cost_price: costPrice, sales_price: salesPrice } = product;

  if (newPrice < costPrice) {
    return { is_valid: false, code: 'NEW_PRICE_BELOW_COST' };
  }
  
  const newPriceLimit = salesPrice * PERCENTAGE_RANGE_LIMIT;
  const minPrice = salesPrice - newPriceLimit;
  const maxPrice = newPriceLimit + salesPrice;

  if (newPrice < minPrice || newPrice > maxPrice) {
    return { is_valid: false, code: 'PRICE_LIMIT_EXCEEDED' }; 
  }

  return { is_valid: true, code: 'NEW_PRICE_IS_VALID' }; 
}

module.exports = { validateNewPrice };