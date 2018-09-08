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
      bucket: 'dropstuffshere',
      metadata: function (req, file, cb) {
        console.log('Inside the metadata where req is',req)
        console.log("---------------------------------\n--------------------------")
        console.log('Inside the metadata where file is',file)
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
    })
  })

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.render('form')
})
app.post('/upload', upload.any(),(req, res, err) => {
  console.log("Inside the /upload post*************************")
  console.log(req.file)
  console.log('************************************************')
  res.send(req.files)
  if(err) {
      console.log("Error ")
  }
})
app.listen(3000,(err,next) => {
    console.log("Listening to the port 3000")
    if (err) {
        console.log(err)
        next()
    }
})