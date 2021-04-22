'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: 'uuid',
        onDelete: 'CASCADE',
      }),
      this.hasMany(models.contacts, {
        foreignKey: 'accid',
        onDelete: 'cascade',
      })
    }
  };
  Accounts.init({
    accid: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    uuid: DataTypes.UUID,
    type: DataTypes.STRING,
    access_token: DataTypes.STRING,
    scope: DataTypes.STRING,
    token_type:DataTypes.STRING,
    expiry_date:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'accounts',
  });

  return Accounts;
};
