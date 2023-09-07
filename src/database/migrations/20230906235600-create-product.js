'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
      code: {
        type: Sequelize.BIGINT,
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cost_price: {
        type: Sequelize.DECIMAL(9,2),
        allowNull: false,
      },
      sales_price: {
        type: Sequelize.DECIMAL(9,2),
        allowNull: false,
      },  
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  }
};
