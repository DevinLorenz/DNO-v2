const {Realm} = require('../models/realm')
const {Region} = require('../models/region')

module.exports = {
    createRegion: async (req, res) => {
        try {
            const {name, notes, realmId} = req.body
            await Region.create({name, notes, realmId})
            res.status(200).send('newRegion')
        } catch (error) {
            console.log('ERROR IN createRegion')
            console.log(error)
            res.sendStatus(400)
        }
    },

    getRegions: async (req, res) => {
        try {
            console.log(req.params, req.body)
            const {realmId} = req.params
            const regions = await Region.findAll({ where : {realmId: realmId}})
            res.status(200).send(regions)
        } catch (error) {
            console.log('ERROR IN getRegions')
            console.log(error)
            res.sendStatus(400)
        }
    },

    viewRegionNotes : async (req, res) => {
        try {
            const {regionId} = req.params
            const {notes} = req.body
            await Region.findByPk(regionId)
            res.status(200).send(notes)
        } catch (error) {
            console.log('ERROR IN viewNotes')
            console.log(error)
            res.sendStatus(400)
        }
    },

    updateRegionNotes: async (req, res) => {
        try {
            const {regionId} = req.params
            const {notes} = req.body
            await Region.update({notes}, {where: {id: regionId}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN updateRegionNotes')
            console.log(error)
            res.sendStatus(400)
        }
    },

    deleteRegion: async (req, res) => {
        try {
            const {regionId} = req.params
            await Region.destroy({where: {id: regionId}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN deleteRegion')
            console.log(error)
            res.sendStatus(400)
        }
    }

}