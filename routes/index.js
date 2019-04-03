var express = require('express');
var router = express.Router();
var LearningResource = require('../models/learningResource');
var multer = require('multer');
var bodyParser = require('body-parser');
var path = require('path');
var fileType = require('file-type');
var readChunk = require('read-chunk');
var mime = require('mime');

router.use(bodyParser.urlencoded({extended: false}));
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
    LearningResource.find({'subject': subject}, function (err, docs) {
        res.render('subject', {title: subject, resources: docs, user: req.user.email});
    });
});

/* Upload Content. */
router.get('/upload', isLoggedIn, function (req, res, next) {
    res.render('upload', {title: 'Share a File', user: req.user.email});
});

const multerConfig = {
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            const filepath = req.body.module;
            next(null, './public/resources/' + filepath);
        },
        fileName: function (req, file, next) {
            // console.log("i am here", file.name);
            // let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            // const ext = file.mimetype.split('/')[1];
            // next(null, Date.now() + path.extname(file.originalname));
            var uploadedFilename = req.file.filename;

            next(null, Date.now() + '.' + mime.extension(file.mimeType));
        }
    }),

    // fileFilter: function (req, file, next) {
    //     if (!file) {
    //         const error = new Error('Please upload a file');
    //         error.httpStatusCode = 400;
    //         return next(error);
    //     }
    //     console.log(file.name)
    //     console.log('File Uploaded');
    //     next(null, true);
    // }
};

router.post('/upload', multer(multerConfig).single('file'), isLoggedIn, function (req, res) {
    file =  req.file;
    console.log(file.mimeType)
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    console.log(req.file.mimeType);
    res.send("Completed!")
});

/*var storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, './public/resources/uploads/');
  },
  filename: function (req, file, next) {
    console.log(file);
    const ext = file.mimetype.split('/')[1];
    next(null, file.fieldname + '-' + Date.now() + '.'+ext);
  }
})

var upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), (req, res, next) => {

  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)

})*/
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}


module.exports = router;
