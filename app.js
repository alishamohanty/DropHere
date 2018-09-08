'use strict'
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId:"" ,//enter the accessKeyId
    secretAccessKey:"" //enter the secretKey
  })
var multer  = require('multer')
var multerS3 = require('multer-s3')
var express = require('express')
var app = express()
var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: '',//name of the bucket
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.originalname});
      },
      key: function (req, file, cb) {
        let filename = file.originalname
        cb(null, filename)
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
    })
  })
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

// AWS.config.loadFromPath('/config.json') or instead we can store the secret credentials at config.json file 
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.render('form')
})

app.post('/upload', upload.any(),(req, res, next) => {
  console.log("Inside the /upload post*************************")
  console.log(req.files)
  console.log('************************************************')
  res.redirect('/success')
})
app.get('/success',(req,res) => {
  res.render('success')
})
app.listen(3000,(err,next) => {
    console.log("Listening to the port 3000")
    if (err) {
        console.log(err)
        next()
    }
})