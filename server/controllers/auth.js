const express = require('express');
const passport = require('../middlewares/authentication');
const validator = require('validator');
const models = require('../models');
//const passport = require('../middlewares/authentication');

const router = express.Router();

router.post('/signup',
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

    models.Users.findOne({
      where: { Email: req.body.email}
    }) 
    .then((user) => {
      if(user) { 
        return res.status(409).json({
          success: false,
          message: 'Form errors',
          errors: {
            email: 'This email is already taken'
          }
        });
      }
      models.Users.create({
        FirstName : req.body.firstName,
        LastName : req.body.lastName,
        Email: req.body.email,
        password_hash: req.body.password,
        Address: req.body.address,
        UserType: req.body.userType,
        PhoneNumber: req.body.phoneNumber
      })
      .then((user) => {
        return res.status(200).json({
          success: true,
          message: 'You have successfully sign up, now you can log in'
        })
      })
      .catch((err)=>{
        console.log(err);
        res.status(400).json({
          success: false,
          message: 'Could not proces the form'
        });
      }) 
    })   
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if(!validationResult.success){
    res.status(400).json({
      success: false,
      message: validationResult.message,
      error: validationResult.error
    })
  }

  passport.authenticate('local', (err, token, userData) => {
    if(userData.message === 'Incorrect CredientialsError.'){
      return res.status(400).json({
        success: false,
        message: 'Could not process the form: ' + userData.message
      });
    }
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);


});

function validateSignupForm(payload){
  console.log(payload);
  const errors = {};
  let isFormValid = true;
  let message = '';

  if(!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)){
    isFormValid = false;
    errors.email = 'Please provide a correct email address';
  }
  if(!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8){
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

function validateLoginForm(payload){
  console.log(payload);
  const errors = {};
  let isFormValid = true;
  let message = '';

  if(!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0){
    isFormValid = false;
    errors.email = 'Please provide an email address';
  }
  if(!payload || typeof payload.password !== 'string' || payload.password.trim().length === 8){
    isFormValid = false;
    errors.password = 'Please provide a password';
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
