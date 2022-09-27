const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/db')

module.exports = {
    User : sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hashedPass: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
}
