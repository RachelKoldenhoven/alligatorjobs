/**
 * Created by rachelkoldenhoven on 3/14/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var queries = require("../../../queries2");


router.get('/', function(req, res, next) {
  //console.log(req.user);
  if(!req.user) {
    res.redirect('/');
  }
  queries.verifyAdmin(req.user).then(function(isAdmin) {
    //console.log(isAdmin);
    if(!isAdmin[0].admin) {
      res.redirect('/');
    } else {
      res.render('admin', { title: 'Alligator Jobs', user: req.user });
    }
    });
});

module.exports = router;
