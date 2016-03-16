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
        return knex.raw('SELECT we.id as we_id, we.user_id as we_user_id, skills.name as skills_name, skills.id as skills_id, levels.id as levels_id, levels.name as levels_name'
                        +' FROM skills FULL JOIN work_exp we ON skills.id = we.skill_id'
                        +' FULL JOIN levels ON levels.id = we.level_id'
                        +' where we.user_id ='+id);
    },

    registerUser: function(newUser) {
        return knex.insert({
            google_id: newUser.google_id,
            email: newUser.email,
            fname: newUser.fname,
            lname: newUser.lname
        }).table('users').returning('id');
    },

    addNewUserInfo: function (id, fname, lname, phone, english, other_skills) {
        return Users()
        .update({
            fname: fname,
            lname: lname,
            phone: phone,
            // english: english,
            // other_skills: other_skills
        })
        .where('id', id);

    },

    addNewSkill: function (user_id, skill_id, level_id) {
        return knex('work_exp')
        .insert({
            user_id: user_id,
            skill_id: skill_id,
            level_id: level_id
        });
    },

    addOtherSkill: function (id, other_skills, english) {
        return Users()
        .update({
            english: english,
            other_skills: other_skills
        })
        .where('id', id);
    },

    addAddress: function (user_id, line_1, line_2, city, state, zip) {
        return knex('addresses')
        .insert({
            user_id: user_id,
            line_1: line_1,
            line_2: line_2,
            city: city,
            state: state,
            zip: zip
        });

    }

//edit profile:Create a triple post query that insert into three tables from one form.


    // getCulture: function(id) {
    //    return Cultures().where('id', id);
    // }


};
