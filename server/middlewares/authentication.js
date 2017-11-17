const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const Users = require('../models').Users;

function passwordsMatch(passwordSubmitted, storedPassword) {
  return bcrypt.compareSync(passwordSubmitted, storedPassword);
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    session: false,
    passReqToCallback: true
  },
  (req, email, password, done) => {
    const userData = {
      email: email,
      password: password
    };
    Users.findOne({
      where: { Email: email },
    }).then((user) => {
      if(!user) {
        return done(null, false, { message: 'Incorrect CredientialsError.' });
      }

      if (passwordsMatch(password, user.password_hash) === false) {
        return done(null, false, { message: 'Incorrect CredientialsError.' });
      }

      const payload = {
        sub: user._id
      }

      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        name: user.Email
      }
      return done(null, token, data);
    })
    .catch(err=>{
      return done(null, false, { message : 'sequelizer error'});
    });
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id).then((user) => {
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
});



module.exports = passport;