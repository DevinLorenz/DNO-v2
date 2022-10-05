const {Region} = require('../models/region')
const {Town} = require('../models/town')

module.exports = {
    createTown: async (req, res) => {
        try {
            const {name, notes, regionId} = req.body
            await Town.create({name, notes, regionId})
            res.status(200).send('newTown')
        } catch (error) {
            console.log('ERROR IN createTown')
            console.log(error)
            res.sendStatus(400)
        }
    },

    getTowns: async (req, res) => {
        try {
            console.log(req.params, req.body)
            const {regionId} = req.params
            const towns = await Town.findAll({ where : {regionId: regionId}})
            res.status(200).send(towns)
        } catch (error) {
            console.log('ERROR IN getTowns')
            console.log(error)
            res.sendStatus(400)
        }
    },

    viewTownNotes : async (req, res) => {
        try {
            const {townId} = req.params
            const {notes} = req.body
            await Town.findByPk(townId)
            res.status(200).send(notes)
        } catch (error) {
            console.log('ERROR IN viewNotes')
            console.log(error)
            res.sendStatus(400)
        }
    },

    updateTownNotes: async (req, res) => {
        try {
            const {townId} = req.params
            const {notes} = req.body
            await Town.update({notes}, {where: {id: townId}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN updateTownNotes')
            console.log(error)
            res.sendStatus(400)
        }
    },

    deleteTown: async (req, res) => {
        try {
            const {townId} = req.params
            await Town.destroy({where: {id: townId}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN deleteTown')
            console.log(error)
            res.sendStatus(400)
        }
    }

}