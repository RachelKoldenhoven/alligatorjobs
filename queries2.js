var knex = require('./db/knex');

function Users() {
    return knex('users');
}

function Cultures() {
    return knex('cultures');
}

module.exports = {

    getUsers: function() {
        return Users().select();
    },

    getUser: function(id) {
        return Users().where('id', id);
    },


    getUserAddress: function(id) {
        return knex('addresses').where('user_id', id);
    },

    getUserWorkExp: function(id){
        return 'select * FROM skills FULL JOIN work_exp we ON skills.id = we.skill_id FULL JOIN levels ON levels.id = we.level_id where we.user_id = id';
    },

    addUser: function () {
        return Users()
        .returning('id')
        .insert({
            fname: fname,
            lname: lname,
            email: email,
            password: password
        });
    },

    getCulture: function(id) {
       return Cultures().where('id', id);
    }


};
