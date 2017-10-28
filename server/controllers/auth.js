const express = require('express');
const models = require('../models');
const passport = require('../middlewares/authentication');

const router = express.Router();

router.post('/sign-up',
  (req, res) => {
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


module.exports = router;
