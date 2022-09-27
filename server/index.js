require('dotenv').config()

const express = require('express')
const cors = require('cors')

const {sequelize} = require('./util/db')
const {PORT} = process.env

const {User} = require('./models/user')
const {Realm} = require('./models/realm')
const {Region} = require('./models/region')

const {getRealms, createRealm, viewRealm, viewRealmNotes, updateRealmNotes, deleteRealm} = require('./controller/realms')

const {getRegions, createRegion, viewRegionNotes, updateRegionNotes, deleteRegion} = require('./controller/regions')

const {register, login} = require('./controller/auth.js')
const {isAuthenticated} = require('./middleware/isAuthenticated')



const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Realm)
Realm.belongsTo(User)

Realm.hasMany(Region)
Region.belongsTo(Realm)

//user
app.post('/user/register', register)
app.post('/user/login', login)

//realms
app.get('/user/realms/:userId', isAuthenticated, getRealms)
app.post('/user/realm/create', isAuthenticated, createRealm)
app.get('/user/realm/:realmId', isAuthenticated, viewRealm)
app.get('/user/realm/notes/:realmId', isAuthenticated, viewRealmNotes)
app.put('/user/realm/:realmId', isAuthenticated, updateRealmNotes)
app.delete('/user/realm/:realmId', isAuthenticated, deleteRealm)

//regions
app.get('/user/regions/:realmId', isAuthenticated, getRegions)
app.post('/user/region/create', isAuthenticated, createRegion)
app.get('/user/region/notes/:regionId', isAuthenticated, viewRegionNotes)
app.put('/user/region/:regionId', isAuthenticated, updateRegionNotes)
app.delete('/user/region/:regionId', isAuthenticated, deleteRegion)





// the force: true is for development -- it DROPS tables!!!
// sequelize.sync({ force: true })
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`db sync successful & server running on port ${PORT}`))
    })
    .catch(err => console.log(err))