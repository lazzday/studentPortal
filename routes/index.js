var express = require('express');
var router = express.Router();
var LearningResource = require('../models/learningResource');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.url);
    res.render('index', {title: 'Noodle Home'});
});

/* GET Timetable page. */
router.get('/timetable', function (req, res, next) {
    console.log(req.url);
    res.render('timetable', {title: 'Timetable'});
});


/* GET individual subject page*/
router.get('/module_*', function (req, res, next) {
    var urlStrings = req.url.split('_');
    var subject = urlStrings[urlStrings.length - 1];
    LearningResource.find({'subject': subject}, function (err, docs) {
        console.log(docs);
        res.render('subject', {title: subject, resources: docs});
    });
});



module.exports = router;
