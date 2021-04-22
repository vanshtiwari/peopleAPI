'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.contacts, {
        foreignKey: 'cid',
        onDelete: 'CASCADE',
      })
    }
  };

  Comments.init({
    cmid: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    cid: DataTypes.UUID,
    uuid: DataTypes.UUID,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comments',
  });

  return Comments;
};
