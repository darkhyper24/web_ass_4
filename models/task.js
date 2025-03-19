const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Task = sequelize.define(
  'task',
  {
    uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: { 
      type: DataTypes.STRING(),  
    },
    content: { 
      type: DataTypes.TEXT,  
      unique: true
    },

  },
  {
    tableName: 'tasks',
    timestamps: false,
  }
);

module.exports = Task;