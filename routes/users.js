var express = require('express');
var router = express.Router();
var csrf =  require('csurf')
var passport = require("passport");

var csrfProtection = csrf();
router.use(csrfProtection);

/* POST user signup*/
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

/* GET user signup*/
router.get('/signup', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {title: 'Register', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
});

/* GET User profile page. */
router.get('/profile', isLoggedIn, function (req, res, next) {
  console.log(req.url);
  res.render('user/profile', {title: 'My Profile'});
});

/* GET user signin*/
router.get('/signin', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {title: 'Sign In', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
