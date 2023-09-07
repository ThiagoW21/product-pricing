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

  Product.associate = (models) => {
    Product.belongsToMany(models.Product, {
      as: 'Packs',
      through: Product,
      foreignKey: 'product_id',
    });
  };
  return Product;
};

module.exports = ProductModel;