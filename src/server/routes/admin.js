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

function deleteAll (usersIDs) {
  var userPromises = usersIDs.map(function (id) {
    var promises = [
      queries.getUser(id).del(),
      queries.getUserAddress(id).del(),
      queries.getUserSkills(id).del()
    ];

    return Promise.all(promises);
  });

  return Promise.all(userPromises);
}

router.post('/users/delete', function(req, res, next) {
    var usersIDs = req.body.deleteTargets;
    console.log('routetargets', req.body.deleteTargets)
    deleteAll(usersIDs)
        .then(function() {
//returns an Object of the deleted usersID back to the jquery
//ajax which then upon success deletes it from the dom.
          res.send(usersIDs);
    })
        .catch(function(err) {
          console.log(err);
        });
});








module.exports = router;
