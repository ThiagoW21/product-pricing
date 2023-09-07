'use strict';

const Product = require('./product.model');

const PackModel = (sequelize, DataTypes) => {
  const Pack = sequelize.define('Pack', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,      
    },
    pack_id: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    qty: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'packs',
    underscored: true
  }
  );

  Pack.associate = (models) => {
    Pack.belongsToMany(models.Product, {
      as: 'Products',
      through: Pack,
      foreignKey: 'pack_id',
    });
  };


  return Pack;
};

module.exports = PackModel;