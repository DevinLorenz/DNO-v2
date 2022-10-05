require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {sequelize} = require('./util/db')
const {PORT} = process.env

const {User} = require('./models/user')
const {Realm} = require('./models/realm')
const {Region} = require('./models/region')
const {Town} = require('./models/town')
const {Npc} = require('./models/npc')

const {getRealms, createRealm, viewRealm, viewRealmNotes, updateRealmNotes, deleteRealm} = require('./controller/realms')

const {getRegions, createRegion, viewRegionNotes, updateRegionNotes, deleteRegion} = require('./controller/regions')

const {getTowns, createTown, viewTownNotes, updateTownNotes, deleteTown} = require('./controller/towns')

const {getNpcsByRealm, getNpcsByRegion, getNpcsByTown, createNpc, viewNpcNotes, editNpcNotes, getFavoriteNpcs, deleteNpc, viewNpcStats, editNpcStats, viewNpcDesc, editNpcDesc } = require('./controller/npcs')

const {register, login} = require('./controller/auth.js')
const {isAuthenticated} = require('./middleware/isAuthenticated')


const app = express()

app.use(express.json())
app.use(cors())



User.hasMany(Realm)
Realm.belongsTo(User)

Realm.hasMany(Region)
Region.belongsTo(Realm)

Region.hasMany(Town)
Town.belongsTo(Region)

Town.hasMany(Npc)
Npc.belongsTo(Town)
Npc.belongsTo(User)
Npc.belongsTo(Realm)
Npc.belongsTo(Region)

//user
app.post('/user/register', register)
app.post('/user/login', login)

//realms
app.get('/user/realms/:userId/retrieve', getRealms)
app.post('/user/realm/:userId/create', createRealm)
app.get('/user/realm/:realmId',  viewRealm)
app.get('/user/realm/notes/:realmId', isAuthenticated, viewRealmNotes)
app.put('/realm/notes/:realmId', isAuthenticated, updateRealmNotes)
app.delete('/user/realm/:realmId', isAuthenticated, deleteRealm)

//regions
app.get('/user/regions/:realmId/retrieve', getRegions)
app.post('/user/regions/:realmId/create', createRegion)
app.get('/user/region/notes/:regionId', isAuthenticated, viewRegionNotes)
app.put('/region/notes/:regionId', isAuthenticated, updateRegionNotes)
app.delete('/user/region/:regionId', isAuthenticated, deleteRegion)

//towns
app.get('/user/towns/:regionId/retrieve', getTowns)
app.post('/user/towns/:regionId/create', createTown)
app.get('/user/town/notes/:townId', isAuthenticated, viewTownNotes)
app.put('/town/notes/:townId', isAuthenticated, updateTownNotes)
app.delete('/user/town/:townId', isAuthenticated, deleteTown)

//npcs
app.post('/user/:realmId/:regionId/:townId/npcs/create', createNpc)
app.get('/user/realm/npcs/:realmId/retrieve', getNpcsByRealm)
app.get('/npcs/region/:regionId', isAuthenticated, getNpcsByRegion)
app.get('/npcs/town/:townId', getNpcsByTown)
app.get('/town/npc/notes/:npcId', isAuthenticated, viewNpcNotes)
app.put('/npc/notes/:npcId', isAuthenticated, editNpcNotes)
app.get('/user/npc/favorites/:userId', isAuthenticated, getFavoriteNpcs)
app.delete('/user/npc/:npcId', isAuthenticated, deleteNpc)
app.get('/user/npc/stats/:npcId', isAuthenticated, viewNpcStats)
app.put('/npc/stats/:npcId', isAuthenticated, editNpcStats)
app.get('/user/npc/desc/:npcId', isAuthenticated, viewNpcDesc)
app.put('/npc/desc/:npcId', isAuthenticated, editNpcDesc)




// the force: true is for development -- it DROPS tables!!!
// sequelize.sync({ force: true })
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
    })
    .catch(err => console.log(err))