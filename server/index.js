require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const auth = require('./controllers/auth')
const children_ctrl = require('./controllers/children_ctrl')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
)


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db set')
})
.catch(err => {
    console.log(err.message)
})

app.post('/auth/register', auth.register)
app.post('/auth/login', auth.login)
app.get('/auth/userinfo', auth.getUserInfo)
app.get('/auth/user', auth.sessionUser)
app.get('/auth/logout', auth.logout)

app.post('/api/addchild', children_ctrl.addChild)
app.post('/api/adddata', children_ctrl.addChildData)
app.get('/api/getchildren', children_ctrl.getChildren)
app.get('/api/childdata/:id', children_ctrl.getChildData)
app.get('/api/alldata', children_ctrl.getAllchildrenData)

app.listen(SERVER_PORT, () => console.log(`All ears on port: ${SERVER_PORT}`))