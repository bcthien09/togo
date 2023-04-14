const { Sequelize } = require('sequelize');
const db = require('../db');
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    max_todo: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE
    }
},{
    timestamps: false,
});
 
module.exports = Users;
