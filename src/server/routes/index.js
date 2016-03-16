var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var queries = require("../../../queries2");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Alligator Jobs', user: req.user? req.user.fname: "" });
});

router.get('/register', helpers.loginRedirect, function(req, res, next) {
  res.render('register', { title: 'Alligator Job', user: req.user});
});

router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  // check if email is unique
  knex('users').where('email', email)
    .then(function(data){
      // if email is in the database send an error
      if(data.length) {
        req.flash('message', {
          status: 'danger',
          message: 'Email already exists.!'
        });
        return res.redirect('/register');
      } else {
        // hash and salt the password
        var hashedPassword = helpers.hashing(password);
        // if email is not in the database insert it
        knex('users').insert({
            email: email,
            password: hashedPassword
          })
          .then(function(data) {
            req.flash('message', {
              status: 'success',
              message: 'Welcome!'
            });
            return res.redirect('/login');
          })
          .catch(function(err) {
            return res.send('crap');
          });
      }
    })
    .catch(function(err){
      return next(err);
    });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Alligator Job', user: req.user? req.user.fname: "" });
});

router.get('/cultures', function(req, res, next) {
  res.render('cultures', { title: 'Alligator Job', user: req.user? req.user.fname: "" });
});

router.get('/cultures/:id', function(req, res, next) {
  res.render('culture_profile', { title: 'Alligator Job', user: req.user? req.user.fname: "" });
});

router.get('/public/user/:id', function(req, res, next) {
  res.render('user', { title: 'Alligator Job', user: req.user? req.user.fname: "" });
});

module.exports = router;
