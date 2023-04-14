const { Sequelize } = require('sequelize');
const db = require('../db');
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
const Tasks = db.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        require: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE
    }
},{
    timestamps: false,
});
 
module.exports = Tasks;
