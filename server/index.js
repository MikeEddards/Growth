require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const auth = require('./auth')

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
    app.listen(SERVER_PORT, () => console.log(`All ears on port: ${SERVER_PORT}`))
})

app.post('/auth/register', auth.register)
app.post('/auth/login', auth.login)