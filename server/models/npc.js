const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/db')

module.exports = {
    Npc: sequelize.define('npc', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        race: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hair: {
            type: DataTypes.STRING,
            allowNull: true
        },
        skin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        eyes: {
            type: DataTypes.STRING,
            allowNull: true
        },
        height: {
            type: DataTypes.STRING,
            allowNull: true
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        faith: {
            type: DataTypes.STRING,
            allowNull: true
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accent: {
            type: DataTypes.STRING,
            allowNull: true
        },
        langAndPerfs: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        isFavorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        strength: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dexterity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        constitution: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        intelligence: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        wisdom: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        charisma: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        armorClass: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        initiative: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hitPoints: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}