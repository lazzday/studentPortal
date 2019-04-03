var express = require('express');
var router = express.Router();
var LearningResource = require('../models/learningResource');
var multer = require('multer');
var bodyParser = require('body-parser');
const moment = require('moment');
const uploadPath = './public/resources/';
const filePath = '/uploads';
var date;

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

/* GET login/signup page. */
router.get('/', function (req, res, next) {
    res.render('welcome', {title: "Noodle", layout: false});
});

/* GET home page. */
router.get('/home', isLoggedIn, function (req, res, next) {
    console.log(req.url);
    res.render('index', {title: 'Noodle Home', user: req.user.email});
});

/* GET Timetable page. */
router.get('/timetable', isLoggedIn, function (req, res, next) {
    console.log(req.url);
    res.render('timetable', {title: 'Timetable', user: req.user.email});
});

/* GET individual subject page*/
router.get('/module_*', isLoggedIn, function (req, res, next) {
    var urlStrings = req.url.split('_');
    var subject = urlStrings[urlStrings.length - 1];
    var isEmpty = true;
    LearningResource.find({'subject': subject}, function (err, docs) {
        if(docs.length > 0) isEmpty = false;
        res.render('subject', {title: subject, resources: docs, user: req.user.email, isempty: isEmpty});
    });
});

/* Upload Content. */
router.get('/upload', isLoggedIn, function (req, res, next) {
    res.render('upload', {title: 'Share a File', user: req.user.email});
});
var date;
const multerConfig = {
  storage: multer.diskStorage({

    destination: function(req, file, next){
      next(null, uploadPath);
    },

    filename: function(req, file, next){
      console.log(file);
      // const fileName = file.originalname.split('.')[0];
      // const ext = file.originalname.split('.')[1];
      date = moment().format('YYYYMMDDhhmmss');
      // next(null, fileName + '.' + ext);
        next(null, date + '_' + file.originalname);
    }
  })
};

router.post('/upload', isLoggedIn, multer(multerConfig).single('file'), function(req, res, next){
    let file = req.file;
    if(!file){
        next();
    }
    var newFile = new LearningResource({
        fileName: date+'_'+file.originalname,
        filePath: "resources/",
        title: file.originalname,
        uploader: req.user.email,
        subject: req.body.module,
        date: moment().format('LT, L')
    });
    newFile.save(function (error, result) {
        if(error){
            return next(error)
        }
        console.log(newFile);
        res.redirect('/uploadsuccess');
        // return next(null, newFile);
    });
    // res.redirect('/home');
});

/* GET Timetable page. */
router.get('/uploadsuccess', isLoggedIn, function (req, res, next) {
    console.log(req.url);
    res.render('uploadsuccess', {title: 'Success!'});
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
module.exports = router;
