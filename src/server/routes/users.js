/**
 * Created by rachelkoldenhoven on 3/14/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var queries = require("../../../queries2");



//Get Single User Profile
router.get('/user/:id/', function(req, res, next) {
    var userID = req.params.id;
    queries.getUser(userID)
        .then(function(userData) {
        queries.getUserAddress(userID)
            .then(function(addressData) {
            queries.getUserWorkExp(userID)
                .then(function(workExpData){
                    res.json(userData, addressData,
                        workExpData
                        );
                    });
                });
        });

    });



router.get('/user/:id/create', function(req, res, next) {
  res.render('index', { title: 'Alligator Job',  user: req.user? req.user.fname: "" });
});

router.get('/user/:id/edit', function(req, res, next) {
  res.render('index', { title: 'Alligator Job', user: req.user? req.user.fname: ""  });
});

router.post('/user/:id/credit', function(req, res, next) {
  res.render('index', { title: 'Alligator Job', user: req.user? req.user.fname: ""  });
});

router.post('/user/:id/edit', function(req, res, next) {
  res.render('index', { title: 'Alligator Job', user: req.user? req.user.fname: ""  });
});


module.exports = router;
