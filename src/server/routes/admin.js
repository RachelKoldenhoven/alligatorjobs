/**
 * Created by rachelkoldenhoven on 3/14/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var queries = require("../../../queries2");


router.get('/', function(req, res, next) {
    if(!req.user) {
   res.redirect('/');
 }
 queries.getUser(req.user).then(function(isAdmin) {
   //console.log(isAdmin);
   if(!isAdmin[0].admin) {
     res.redirect('/');
   } else {
    queries.getUser(req.user)
       .then(function(adminData) {
            queries.getUsers()
            .then(function(usersData) {
                res.render('admin', {
                    title: 'Admin Dashboard',
                    adminData: adminData[0],
                    usersData: usersData,
                    isAdmin: true
                });
            });
       });
   }
   });
});

function deleteAll (usersID) {
  for (var i = 0; i<usersID.length; i++) {
   queries.getUser(usersID[i]).del()
    .then(function() {
      queries.getUserAddress(usersID[i]).del()
      .then(function() {
        queries.getUserSkills(usersID[i]).del()
        });
    });
 }
}

router.post('/users/delete', function(req, res, next) {
    var usersID = req.body.deleteTargets;
    deleteAll(usersID)
        .then(function() {
          res.redirect('/admin');
    });
});














module.exports = router;
