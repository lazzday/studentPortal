var express = require('express');
var router = express.Router();
var csrf =  require('csurf')
var passport = require("passport");

var csrfProtection = csrf();
router.use(csrfProtection);

/* POST user signup*/
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/home',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

/* GET user signup*/
router.get('/signup', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {title: 'Register', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, layout: false})
});

/* GET User profile page. */
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('user/profile', {title: 'My Profile', user: req.user.email});
});

/* GET user signin*/
router.get('/signin', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {title: 'Sign In', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0, layout: false})
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/home',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function alreadyLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/home');
}

