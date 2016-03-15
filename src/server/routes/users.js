/**
 * Created by rachelkoldenhoven on 3/14/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('knex');
var queries = require("../../../queries2");


router.get('/user/:id', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/:id/create', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/:id/edit', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/:id/credit', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/:id/edit', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
