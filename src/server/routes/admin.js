/**
 * Created by rachelkoldenhoven on 3/14/16.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var queries = require("../../../queries2");


router.get('/', function(req, res, next) {
    console.log("slkdjfslkdjflsdkjf", req.user);
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
                    usersData: usersData
                });
            });
       });
   }
   });

router.put('/admin/users/delete', function(req, res, next) {
  var userID = req.params.id;
  queries.getUser(userID).del()
  .then(function(data) {
    queries.getUserAddress.del()
    .then(function(data) {
      res.redirect('/');
    });
  });
});








});

module.exports = router;
