var express = require('express');
var router = express.Router();
var LearningResource = require('../models/learningResource');


var receivedURL = "";

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.url);
  res.render('index', { title: 'Noodle Home' });
});



/* GET individual subject page*/
router.get('/*', function (req, res, next) {
  console.log(req.url);
  if (req.url.includes("/upload")){
    // insert upload code
  } else if (req.url.includes("/user")) {
    // insert user account code
  } else {
    res.render('subject', {title: 'Subject'});
  }
});

module.exports = router;
