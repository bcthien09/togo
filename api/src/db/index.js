const { Sequelize } = require('sequelize');
const config = require('../config');

const db = new Sequelize(config.db.databaseName, 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 100,
        min: 0,
        acquire: 60000,
        idle: 10000
      }
});

module.exports = db;
