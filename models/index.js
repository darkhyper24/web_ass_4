const User = require('./user');
const Task = require('./task');
const sequelize = require('../db');

User.hasMany(Task, { foreignKey: 'uid' });
Task.belongsTo(User, { foreignKey: 'uid' });
module.exports = {User, Task, sequelize};