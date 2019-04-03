var express = require('express');
var router = express.Router();
var LearningResource = require('../models/learningResource');
var multer = require('multer');
var bodyParser = require('body-parser');
const moment = require('moment')
const uploadPath = './public/resources';
const filePath = '/uploads';
var date;

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

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

/* Upload Content. */
router.get('/upload', function (req, res, next) {
    console.log(req.url);
    res.render('upload', {title: 'Upload Content'});
});

const multerConfig = {

  storage: multer.diskStorage({

    destination: function(req, file, next){
      next(null, uploadPath + filePath);
    },

    filename: function(req, file, next){
      console.log(file);
      const fileName = file.originalname.split('.')[0]
      var date = moment().format('YYYYMMDDhhmmss');
      next(null, fileName + '-' + date + ".txt");
    }
  }),

  fileDBUpload: function(req, file, next){
        if(!file){
          next();
        }

        var newFile = new LearningResource();

        newFile.fileName = file.originalname;
        newFile.filePath = uploadPath + filePath;
        newFile.title = file.fieldname;
        newFile.uploader = 'testuser';
        newFile.subject = req.body.module;
        newFile.date = moment().format('L');

        newFile.save(function (error, result) {
          if(error){
            return next(error)
          }
          return next(null, newFile);
        });

        console.log('file uploaded');
        next(null, true);
  }
};

router.post('/upload', multer(multerConfig).single('file'),function(req, res){
    res.send('Complete!');
});

module.exports = router;
