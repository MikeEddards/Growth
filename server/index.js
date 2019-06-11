require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const auth = require('./controllers/auth')
const children_ctrl = require('./controllers/children_ctrl')
const s3Controller = require('./controllers/s3Controller')
const dataInjector = require('./controllers/dataInjector')
const cdcChartData = require('./controllers/cdcChartData')

const { SERVER_PORT, 
  CONNECTION_STRING, 
  SESSION_SECRET 
  } = process.env

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
app.put('/auth/updateuser', auth.updateUser)

app.post('/api/addchild', children_ctrl.addChild)
app.post('/api/adddata', children_ctrl.addChildData)
app.get('/api/getchildren', children_ctrl.getChildren)
app.get('/api/childdata/:id', children_ctrl.getChildData)
app.get('/api/getchildinfo/:id', children_ctrl.getChildInfo)
app.get('/api/alldata', children_ctrl.getAllchildrenData)
app.delete('/api/deletechild/:id', children_ctrl.deleteChild)
app.put('/api/updateinfo/:id', children_ctrl.updateChildName)
app.put('/api/updatedata/:id', children_ctrl.updateDataSet)

app.get('/sign-s3', s3Controller.awsCall) 

app.post('/inject036weight', dataInjector.weight_0_36)
app.post('/inject220bmi', dataInjector.bmi_2_20)
app.post('/injectheadsize', dataInjector.head_size)
app.post('/inject036height', dataInjector.height_0_36)
app.post('/inject220height', dataInjector.height_2_20)
app.post('/inject220weight', dataInjector.weight_2_20)

app.get('/cdcheight036boys', cdcChartData.boyHeight_0_36)
app.get('/cdcheight036girls', cdcChartData.girlHeight_0_36)
app.get('/cdcweight036boys', cdcChartData.boyWeight_0_36)
app.get('/cdcweight036girls', cdcChartData.girlWeight_0_36)
app.get('/cdcheadsizeboys', cdcChartData.boyHead_0_36)
app.get('/cdcheadsizegirls', cdcChartData.girlHead_0_36)
app.get('/cdcbmiboys', cdcChartData.boyBmi_2_20)
app.get('/cdcbmigirls', cdcChartData.girlBmi_2_20)
app.get('/cdc220heightboys', cdcChartData.boyHeight_2_20)
app.get('/cdc220heightgirls', cdcChartData.girlHeight_2_20)
app.get('/cdc220weightboys', cdcChartData.boyWeight_2_20)
app.get('/cdc220weightgirls', cdcChartData.girlWeight_2_20)






app.listen(SERVER_PORT, () => console.log(`All ears on port: ${SERVER_PORT}`))