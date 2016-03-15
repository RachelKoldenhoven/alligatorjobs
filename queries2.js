var knex = require('./db/knex');

function Users() {
    return knex('users');
}

function Cultures() {
    return knex('cultures');
}

module.exports = {

    getAllProfiles: function() {
        return Users()
        .fullOuterJoin('addresses', 'users'.'id', 'addresses'.'user_id')
        .rightJoin
    },

    getOneUser: function(id) {
        return Users().select().where('id', id);
    },

    getCulture: function(id) {
       return Cultures().where('id', id);
    },


};
