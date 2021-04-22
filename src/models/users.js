'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.accounts, {
        foreignKey: 'uuid',
        onDelete: 'cascade',
      })
    }

  };
  Users.init({
    uuid: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    id: DataTypes.STRING,
    email: DataTypes.STRING,
    picture: DataTypes.STRING,
    username: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });

  return Users;
};
