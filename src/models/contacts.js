'use strict';
const { INTEGER } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.comments, {
        foreignKey: 'cid',
        onDelete: 'CASCADE',
      })
      this.belongsTo(models.accounts, {
        foreignKey: 'accid',
        onDelete: 'CASCADE',
      })
    }
  };
  Contacts.init({
    cid: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: DataTypes.STRING,
    email:DataTypes.STRING,
    phone: DataTypes.INTEGER,
    accid: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'contacts',
  });

  return Contacts;
};
