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

    registerUser: function(newUser) {
        return knex.insert({
            google_id: newUser.google_id,
            email: newUser.email,
            fname: newUser.fname,
            lname: newUser.lname
        }).table('users').returning('id');
    },

    addNewUserInfo: function (id, english, other_skills) {
        return Users()
        .update({
            english: english,
            other_skills: other_skills
        })
        .where('id', id);

    }



    // getCulture: function(id) {
    //    return Cultures().where('id', id);
    // }


};
