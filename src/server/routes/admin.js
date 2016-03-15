/**
 * Created by rachelkoldenhoven on 3/14/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('knex');
var queries = require("../../../queries");


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
