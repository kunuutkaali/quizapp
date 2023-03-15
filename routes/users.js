var express = require('express');
var passport = require('passport');
var router = express.Router();
var connectEnsureLoggedIn = require('connect-ensure-login');
const User = require('./../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET Log in form
router.get('/login', (req, res, next)=>{
  res.render('users/login', {title: "Log in"});
})
// GET Log in form
router.post('/login', passport.authenticate('local', {failureRedirect:'/users/login', failureMessage: true}), (req, res, next)=>{
  console.log(req.user)
  res.redirect('/users/dashboard');
})


// Login successfull
router.get('/dashboard', connectEnsureLoggedIn.ensureLoggedIn('/users/login'),
  (req, res, next)=>{
    res.render('users/dashboard', {title: 'Dashboard', user: req.user})
})



// GET Register form
router.get('/register', (req, res, next)=>{
  res.render('users/register', {title: "Register new user"});
})

// POST Register form
router.post('/register', (req, res, next)=>{
  let username = req.body.email;
  if(req.body.username !== ""){
    username = req.body.username;
  }
  console.log('registering user');
  User.register(new User({email: req.body.email, username: username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    console.log('user registered!');
    res.redirect('/users/register-success');
  });
})
// Register successfull
router.get('/register-success',(req, res, next)=>{
  res.render('users/register-success', {title: "Registration success", });
})

module.exports = router;
