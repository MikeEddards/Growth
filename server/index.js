require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const auth = require('./controllers/auth')
const children_ctrl = require('./controllers/children_ctrl')
const aws = require('aws-sdk');

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
app.put('/auth/updateuser', auth.updateUser)

app.post('/api/addchild', children_ctrl.addChild)
app.post('/api/adddata', children_ctrl.addChildData)
app.get('/api/getchildren', children_ctrl.getChildren)
app.get('/api/childdata/:id', children_ctrl.getChildData)
app.get('/api/getchildinfo/:id', children_ctrl.getChildInfo)
app.get('/api/alldata', children_ctrl.getAllchildrenData)
app.delete('/api/deletechild/:id', children_ctrl.deleteChild)
app.put('/api/updateinfo/:id', children_ctrl.updateChildName)
app.put('/api/updatedata', children_ctrl.updateDataSet)



const {
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env

app.get('/sign-s3', (req, res) => {

  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
});


app.listen(SERVER_PORT, () => console.log(`All ears on port: ${SERVER_PORT}`))