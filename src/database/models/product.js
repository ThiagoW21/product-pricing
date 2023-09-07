'use strict';

const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    code: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
      primaryKey: true, 
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cost_price: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
    },    
    sales_price: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
    },  
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true
  }
  );

  return Product;
};

module.exports = ProductModel;