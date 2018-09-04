'use strict'
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
// const moment = require('moment')
// const fileType = require('file-type')
var express = require('express')
var app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.render('form')
})
app.listen(3000,(err,next) => {
    console.log("Listening to the port 3000")
    if (err) {
        console.log(err)
        next()
    }
})