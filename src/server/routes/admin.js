/**
 * Created by rachelkoldenhoven on 3/14/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var queries = require("../../../queries2");


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Alligator Jobs', user: req.user? req.user.fname: ""  });
});

module.exports = router;
