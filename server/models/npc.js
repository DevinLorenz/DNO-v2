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
            type: DataTypes.STRING,
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
        langAndProfs: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        isFavorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        strength: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dexterity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        constitution: {
            type: DataTypes.STRING,
            allowNull: true
        },
        intelligence: {
            type: DataTypes.STRING,
            allowNull: true
        },
        wisdom: {
            type: DataTypes.STRING,
            allowNull: true
        },
        charisma: {
            type: DataTypes.STRING,
            allowNull: true
        },
        armorClass: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        initiative: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        hitPoints: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    })
}