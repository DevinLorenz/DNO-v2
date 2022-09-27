const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/db')

module.exports = {
    Region : sequelize.define('region', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    })
}