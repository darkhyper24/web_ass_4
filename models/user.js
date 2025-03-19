const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { 
      type: DataTypes.TEXT,  

    },
    email: { 
      type: DataTypes.TEXT, 

      unique: true
    },
    password: { 
      type: DataTypes.STRING(60),
    }
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

module.exports = User;