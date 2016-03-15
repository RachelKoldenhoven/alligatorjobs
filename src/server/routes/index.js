var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('knex');
var queries = require("../../../queries");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/cultures', function(req, res, next) {
  res.render('cultures', { title: 'Express' });
});

router.get('/cultures/:id', function(req, res, next) {
  res.render('culture_profile', { title: 'Express' });
});

router.get('/public/user/:id', function(req, res, next) {
  res.render('user', { title: 'Express' });
});

module.exports = router;
