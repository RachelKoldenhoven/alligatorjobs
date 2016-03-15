/**
 * Created by rachelkoldenhoven on 3/14/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var passport = require('passport');
var queries = require("../../../queries2");
var LocalStrategy = require('passport-local').Strategy;
var helpers = require('../lib/helpers');


passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function(email, password, done) {
    // does the email exist?
    knex('users').where('email', email)
      .then(function(data) {
        // email does not exist. return error.
        if (!data.length) {
          return done('Incorrect email.');
        }
        var user = data[0];
        // email found but do the passwords match?
        if (helpers.comparePassword(password, user.password)) {
          // passwords match! return user
          return done(null, user);
        } else {
          // passwords don't match! return error
          return done('Incorrect password.');
        }
      })
      .catch(function(err) {
        // issue with SQL/nex query
        return done('Incorrect email and/or password.');
      });
  }
));

// sets the user to 'req.user' and establishes a session via a cookie
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used on subsequent requests to update 'req.user' and updates session
passport.deserializeUser(function(id, done) {
  knex('users').where('id', id)
    .then(function(data) {
      return done(null, data[0]);
    })
    .catch(function(err) {
      return done(err);
    });
});


/// google auth ///
router.get('/google',
  passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
  ));

router.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/google/success',
    failureRedirect: '/google/failure'
  }));

router.get('/logout', function(req, res, next) {
  req.logOut();
  res.redirect('/');
});


module.exports = router;








