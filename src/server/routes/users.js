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
    console.log("Hey!", userID);
    queries.getUser(userID)
      .then(function(userData) {
        queries.getUserAddress(userID)
        .then(function(addressData) {
            userData.address = addressData;
          queries.getUserWorkExp(userID)
            .then(function(workExpData){
              userData.workExp = JSON.stringify(workExpData.rows);
                console.log(userData);
                res.render('user', {
                  title: 'User Profile',
                  user: req.user,
                  userData: userData[0],
                  userAddress: userData.address[0],
                  userSkills: userData.workExp
                })
            });
        });
    });
});


router.get('/:id/edit', function(req, res, next) {
  res.render('index', { title: 'Alligator Job', user: req.user? req.user.fname: ""  });
});

router.put('/user/:id/credit', function(req, res, next) {
  res.render('index', { title: 'Alligator Job', user: req.user? req.user.fname: ""  });
});

router.post('/user/:id/edit', function(req, res, next) {
  res.render('index', { title: 'Alligator Job', user: req.user? req.user.fname: ""  });
});


module.exports = router;
