const {Realm} = require('../models/realm')
const {User} = require('../models/user')

module.exports = {
    createRealm: async (req, res) => {
        try {
            const {name, notes, userId} = req.body
            await Realm.create({name, notes, userId})
            res.status(200).send('newRealm')
        } catch (error) {
            console.log('ERROR IN createRealm here')
            console.log(error)
            res.sendStatus(400)
        }
    },

    getRealms: async (req, res) => {
        try {
            console.log(req.params, req.body)
            const {userId} = req.params

            const realms = await Realm.findAll({ where : {userId: userId}})
            
            res.status(200).send(realms)
        } catch (error) {
            console.log('ERROR IN getRealms')
            console.log(error)
            res.sendStatus(400)
        }
    },

    viewRealm: async (req, res) => {
        try {
            const {realmId} = req.params
            await Realm.findByPk(realmId)
            res.status(200).send(realm)
        } catch (error) {
            console.log('ERROR IN viewRealm')
            console.log(error)
            res.sendStatus(400)
        }
    },

    viewRealmNotes: async (req, res) => {
        try {
            const {realmId, realmNotes} = req.params
            const {notes} = req.body
            await Realm.findByPk(realmId)
            res.status(200).send(notes)
        } catch (error) {
            console.log('ERROR IN viewRealmNotes')
            console.log(error)
            res.sendStatus(400)
        }
    },

    updateRealmNotes: async (req, res) => {
        try {
            const {realmId} = req.params
            const {notes} = req.body
            await Realm.update({notes}, {where: {id: realmId}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN updateRealmNotes')
            console.log(error)
            res.sendStatus(400)
        }
    },

    deleteRealm: async (req, res) => {
        try {
            const {realmId} = req.params
            await Realm.destroy({where: {id: realmId}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN deleteRealm')
            console.log(error)
            res.sendStatus(400)
        }
    }
}
