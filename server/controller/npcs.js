const {Npc} = require('../models/npc');
const {Town} = require('../models/town');
const {Region} = require('../models/region');
const {Realm} = require('../models/realm');
const {User} = require('../models/user');

module.exports = {

    createNpc: async (req, res) => {
        try {
            const {firstName, lastName, gender, race, hair, skin, eyes, height, weight, age, faith, occupation, accent, langAndProfs, notes, strength, dexterity, constitution, intelligence, wisdom, charisma, armorClass, initiative, hitPoints, userId, realmId, regionId, townId} = req.body
            await Npc.create({firstName, lastName, gender, race, hair, skin, eyes, height, weight, age, faith, occupation, accent, langAndProfs, notes, strength, dexterity, constitution, intelligence, wisdom, charisma, armorClass, initiative, hitPoints,  userId, realmId, regionId, townId
        })
            res.status(200).send('newNpc')
        } catch (error) {
            console.log('ERROR IN createNpc')
            console.log(error)
            res.sendStatus(400)
        }
    },

    getNpcsByTown: async (req, res,) => {
        try {
            const {townId} = req.params;
            const town = await Town.findByPk(townId);
            const npcs = await town.getNpcs();
            res.status(200).send(npcs);
        } catch (error) {
            console.log('ERROR IN getNpcsByTown');
            console.log(error);
            res.sendStatus(400);
        }
    },

    getNpcsByRegion: async (req, res, next) => {
        try {
            const {regionId} = req.params;
            const region = await Region.findByPk(regionId);
            const towns = await region.getTowns();
            const npcs = await towns.getNpcs();
            res.status(200).send(npcs);
        } catch (error) {
            console.log('ERROR IN getNpcsByRegion');
            console.log(error);
            res.sendStatus(400);
        }
    },

    getNpcsByRealm: async (req, res, next) => {
        try {
            const {realmId} = req.params;
            const npcs = await Npc.findAll({where: {realmId: realmId}});
            res.status(200).send(npcs);
            
        } catch (error) {
            console.log('ERROR IN getNpcsByRealm');
            console.log(error);
            res.sendStatus(400);
        }
    },

    getFavoriteNpcs: async (req, res) => {
        try {
            const {npc, user} = req.params;
            const npcId = await npc.findByPk(npcId);
            const userId = await user.findByPk(userId);
            const favNpcs = await user.getNpcs({where: {isFavorite: true}});
            res.status(200).send(favNpcs);
        } catch (error) {
            console.log('ERROR IN getFavoriteNpcs');
            console.log(error);
            res.sendStatus(400);
        }
    },

    viewNpcStats: async (req, res) => {
        try {
            const {npcId} = req.params;
            const {strength, dexterity, constitution, intelligence, wisdom, charisma, armorClass, initiative, hitPoints} = req.body;
            await Npc.findByPk(npcId);
            res.status(200).send(strength, dexterity, constitution, intelligence, wisdom, charisma, armorClass, initiative, hitPoints);
        } catch (error) {
            console.log('ERROR IN viewNpcStats');
            console.log(error);
            res.sendStatus(400);
        }
    },

    editNpcStats: async (req, res) => {
        try {
            const {npcId} = req.params;
            const {strength, dexterity, constitution, intelligence, wisdom, charisma, armorClass, initiative, hitPoints} = req.body;
            await Npc.findByPk(npcId);
            res.status(200).send(strength, dexterity, constitution, intelligence, wisdom, charisma, armorClass, initiative, hitPoints, langAndPerfs);
        } catch (error) {
            console.log('ERROR IN editNpcStats');
            console.log(error);
            res.sendStatus(400);
        }
    },

    viewNpcDesc: async (req, res) => {
        try {
            const {npcId} = req.params;
            const {firstName, LastName, gender, race, hair, skin, eyes, height, weight, faith, age} = req.body;
            await Npc.findByPk(npcId)
            res.status(200).send(firstName, LastName, gender, race, hair, skin, eyes, height, weight, faith, age);
        } catch (error) {
            console.log('ERROR IN viewNpcDesc');
            console.log(error);
            res.sendStatus(400);
        }
    },

    editNpcDesc: async (req, res) => {
        try {
            const {npcId} = req.params;
            const {firstName, LastName, gender, race, hair, skin, eyes, height, weight, faith, age} = req.body;
            await Npc.findByPk(npcId)
            res.status(200).send(firstName, LastName, gender, race, hair, skin, eyes, height, weight, faith, age);
        } catch (error) {
            console.log('ERROR IN editNpcDesc');
            console.log(error);
            res.sendStatus(400);
        }
    },

    viewNpcNotes: async (req, res) => {
        try {
            const {npcId} = req.params;
            const {notes} = req.body;
            await Npc.findByPk(npcId)
            res.status(200).send(notes);
        } catch (error) {
            console.log('ERROR IN viewNpcNotes');
            console.log(error);
            res.sendStatus(400);
        }
    },

    editNpcNotes: async (req, res) => {
        try {
            const {npcId} = req.params;
            const {notes} = req.body;
            await Npc.findByPk(npcId)
            res.status(200).send(notes);
        } catch (error) {
            console.log('ERROR IN editNpcNotes');
            console.log(error);
            res.sendStatus(400);
        }
    },

    deleteNpc: async (req, res) => {
        try {
            const {npcId} = req.params;
            await Npc.destroy({where: {id: npcId}});
            res.sendStatus(200);
        } catch (error) {
            console.log('ERROR IN deleteNpc');
            console.log(error);
            res.sendStatus(400);
        }
    }



            
}


