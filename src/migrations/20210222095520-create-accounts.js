'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      accid: {
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      access_token: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      scope: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      token_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      uuid: {
        onDelete: 'CASCADE',
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'uuid'
        },
        allowNull: false
      },

      expiry_date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};
