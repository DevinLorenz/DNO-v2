const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/db')

module.exports = {
    Town : sequelize.define('town', {
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