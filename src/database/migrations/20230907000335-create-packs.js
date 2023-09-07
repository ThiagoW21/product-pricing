'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('packs', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,      
      },
      pack_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'products',
          key: 'code'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'products',
          key: 'code'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      qty: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, _Sequelize) {
     await queryInterface.dropTable('packs');
  }
};
