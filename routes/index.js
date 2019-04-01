var express = require('express');
var router = express.Router();
var LearningResource = require('../models/learningResource');
var multer = require('multer');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.url);
    res.render('index', {title: 'Noodle Home'});
});

/* GET individual subject page*/
router.get('/module_*', function (req, res, next) {
    var urlStrings = req.url.split('_');
    var subject = urlStrings[urlStrings.length - 1];
    LearningResource.find({'subject': subject}, function (err, docs) {
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
    const filepath = req.body.module;
    console.log(filepath);

    next(null, './public/resources/' + filepath);
   },

  fileName: function(req, file, next){
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.'+ext);
    }
  }),

  fileFilter: function(req, file, next){
      if(!file){
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
      }

      console.log('File Uploaded');
      next(null, true);
  }
};

router.post('/upload',multer(multerConfig).single('file'),function(req,res){
   res.send('Complete!');
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

module.exports = router;
