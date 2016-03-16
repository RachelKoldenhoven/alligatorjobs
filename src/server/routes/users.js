/**
 * Created by rachelkoldenhoven on 3/14/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var queries = require("../../../queries2");



//Get Single User Profile
router.get('/:id', function(req, res, next) {
    var userID = req.params.id;
    queries.getUser(userID)
      .then(function(userData) {
        queries.getUserAddress(userID)
        .then(function(addressData) {
            userData.address = addressData;
          queries.getUserWorkExp(userID)
            .then(function(workExpData){
              workExpData = workExpData.rows;
                res.render('user', {
                  title: 'User Profile',
                  user: req.user,
                  userData: userData[0],
                  userAddress: userData.address[0],
                  userSkills: workExpData
                })
            });
        });
    });
});

router.get('/:id/edit', function(req, res, next) {
  var userID = req.params.id;
  queries.getUser(userID)
      .then(function(userData) {
        queries.getUserAddress(userID)
        .then(function(addressData) {
            userData.address = addressData;
          queries.getUserWorkExp(userID)
            .then(function(workExpData){
              workExpData = workExpData.rows;
                res.render('profile_builder', {
                  title: 'Profile Builder',
                  user: req.user,
                  userData: userData[0],
                  userAddress: userData.address[0],
                  userSkills: workExpData
                })
            });
        });
    });
});

router.put('/user/:id/edit-contact', function(req, res, next) {
});

router.put('/user/:id/edit-address', function(req, res, next) {
});

router.put('/user/:id/edit-skills', function(req, res, next) {
});



module.exports = router;
