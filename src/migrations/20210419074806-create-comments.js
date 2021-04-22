'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      cmid: {
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
      },
      cid: {
        onDelete: 'CASCADE',
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'contacts',
          },
          key: 'cid'
        },
        allowNull: false
      },
      uuid: {
        type: Sequelize.DataTypes.UUID
      },
      comment: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('comments');
  }
};
