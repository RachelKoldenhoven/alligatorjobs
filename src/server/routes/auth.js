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
    queries.getUserByEmail(email)
      .then(function(data) {
        // email does not exist. return error.
        if (!data.length) {
          console.log('wrong email');
          return done('Incorrect email.');
        }
        var user = data[0];
        // email found but do the passwords match?
        if (helpers.comparePassword(password, user.password)) {
          // passwords match! return user
          return done(null, user);
        } else {
          // passwords don't match! return error
          console.log('wrong pw');
          return done('Incorrect password.');
        }
      })
      .catch(function(err) {
        // issue with SQL/nex query
        console.log('hitting catch for login route');
        return done('Incorrect email and/or password.');
      });
  }
));



/// google auth ///
router.get('/google',
  passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
  ));

router.get( '/google/callback',
  passport.authenticate( 'google', {
    failureRedirect: '/login'
  }), function(req, res, next) {
    //console.log('---------- register user ----------');
      queries.registerUser(req.user).then(function(id) {
        //console.log('----- user:', req.user);
        //console.log("user id yo: " + id);
        res.redirect('/');
      }).catch(function() {
        //console.log('----- err:', req.user);
        // TODO: hack for duplicate inserts
        res.redirect('/');
      });
    //}
  });

router.get('/logout', function(req, res, next) {
  req.logOut();
  res.redirect('/');
});


module.exports = router;








