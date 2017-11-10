const express = require('express');
const passport = require('passport');
const validator = require('validator');
const models = require('../models');
const passport = require('../middlewares/authentication');

const router = express.Router();

router.post('/sign-up',
  (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if(!validationResult.success){
      console.log('validation failed');
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }
    models.Users.create({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email: req.body.email,
    password_hash: req.body.password,
    Address: req.body.address,
    UserType: req.body.userType,
    phoneNumber: req.body.phoneNumber
  })
    .then((user) => {
      req.login(user, () => {
        res.redirect('/profile');
      })
    })
});

router.get('/logout', 
  (req,res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/login', 
  passport.redirectIfLoggedIn('/profile'),
  (req, res) => {
  res.render('login');
})

router.post('/login', (req, res) => {
   passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login',
    })(req, res);
});

function validateSignupForm(payload){
  console.log(payload);
  const errors = {};
  let isFormValid = true;
  let message = '';

  if(!payload || typeof payload.email != 'string' || !validator.isEmail(payload.email)){
    isFormValid = false;
    errors.email = 'Please provide a correct email address';
  }
  if(!payload || typeof payload.passport != 'string' || payload.password.trim().length < 8){
    isFormValid = false;
    errors.password = 'Password mush have at least 8 characters.';
  }
  if(!isFormValid){
    message = 'The form has errors';
  }
  return {
    success: isFormValid,
    message,
    errors
  };
}



module.exports = router;
