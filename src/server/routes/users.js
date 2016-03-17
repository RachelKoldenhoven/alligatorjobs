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
              console.log(workExpData);
                res.render('profile_builder', {
                  title: 'Profile Builder',
                  user: req.user,
                  userData: userData[0],
                  userAddress: userData.address[0],
                  workExperience: workExpData
                })
            });
        });
    });
});

router.put('/:id/edit-contact', function(req, res, next) {
  var userUpdate = req.body;
  queries.getUser(req.params.id).update({'fname': userUpdate.fname, 'lname': userUpdate.lname, 'email': userUpdate.email, 'phone':userUpdate.phone})
    .then(function() {
      res.json({message: 'Contact information updated.'});
    })
    .catch(function() {
      res.json({message: 'Something went wrong.'});
    });
});

router.post('/:id/edit-address', function(req, res, next) {
  var userID = req.params.id;
  var addressUpdate = req.body;
  console.log('Server-side req.body is', addressUpdate);
  queries.getUserAddress(userID)
  .then(function(data) {
    if (data.length) {
      queries.updateAddress(userID, addressUpdate)
      .then(function() {
        res.json({message: 'Address information updated.'});
      })
      .catch(function() {
        res.json({message: 'Something went wrong updating your address.'})
      })
    } else {
      queries.addAddress(userID, addressUpdate)
      .then(function() {
        res.json({message: 'Address information added.'});
      })
      .catch(function(err) {
        console.log(err);
        res.json({message: 'Something went wrong adding your address.'})
      })
    }
  })
  .catch(function() {
    console.log('Something is genuinely messed up.');
  })
});

router.post('/:id/edit-skills', function(req, res, next) {
  var userID = req.params.id;
  var skillsUpdate = JSON.parse(req.body.data);
  console.log('Server-side req.body is', skillsUpdate);
  var skillsOnly = skillsUpdate.skills;
  console.log('skills only', skillsOnly);
  for (var i = 0; i < skillsOnly.length; i++ ) {

  }
});



module.exports = router;
