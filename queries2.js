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

    getUserByEmail: function (email) {
        return Users().where('email', email);
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

    getSingleCulture: function(id) {
        return knex('cultures').where('id', id);
    },

    getCultureResources: function(culture_id) {
        return knex('resources').where('culture_id', culture_id);
    },

    registerUserGoogle: function(newUser) {
        return knex.insert({
            google_id: newUser.google_id,
            email: newUser.email,
            fname: newUser.fname,
            lname: newUser.lname
        }).table('users').returning('*');
    },

    registerUser: function(newUser) {
        return knex.insert({
            email: newUser.email,
            fname: newUser.fname,
            lname: newUser.lname,
            password: newUser.password
        }).table('users').returning('*');
    },

    addNewUserInfo: function (id, fname, lname, phone, english, other_skills) {
        return Users()
        .update({
            fname: fname,
            lname: lname,
            phone: phone,
            email: email

        })
        .where('id', id);

    },

    addNewSkill: function (user_id, skillObj) {
        return knex('work_exp')
        .insert({
            user_id: user_id,
            skill_id: skillObj.skill_id,
            level_id: skillObj.level_id
        });
    },

    updateSkill: function (user_id, skillObj) {
        return knex('work_exp').where('user_id', user_id)
        .update({
            skill_id: skillObj.skill_id,
            level_id: skillObj.level_id
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

    addAddress: function (user_id, addressObj) {
        return knex('addresses')
        .insert({
            user_id: user_id,
            line_1: addressObj.line_1,
            line_2: addressObj.line_2,
            city: addressObj.city,
            state: addressObj.state,
            zip: addressObj.zip
        });

    },

    updateAddress: function (user_id, addressObj) {
        return knex('addresses')
        .update({
            line_1: addressObj.line_1,
            line_2: addressObj.line_2,
            city: addressObj.city,
            state: addressObj.state,
            zip: addressObj.zip
        })
        .where('user_id', user_id);

    },

    verifyAdmin: function(userId) {
        return knex.column('admin').select().from('users').where('id', userId);
    }
};
