var express = require('express');
var router = express.Router();
var fs = require("fs")
var path = require("path")

/* GET home page. */
router.get('/past', function(req, res, next) {
  const promiseProcess = new Promise(function(resolve,reject){
    fs.readFile(path.resolve("../crawler/store/past_tweets.txt"),"utf8",function(err,text){
      if(err) reject(err);
      resolve(text);
    })
  })
  .then(function(data){
    res.json({
      images: data.trim().split("\n")
    })
  })
});

module.exports = router;