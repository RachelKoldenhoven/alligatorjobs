var queries = require('./queries');

function emailCheck(newEmail) {
    var result;
    return queries.Users().select('email')
    .then(function(emails) {
        var existingNames = [];
        for (var i = 0; i < names.length; i++) {
            existingNames.push(emails[i].email);
        }

        if (existingNames.indexOf(newEmail.trim()) != -1) {
            result = 'This email is already in use.';
        }
        return result;
    });
}


module.exports = emailCheck;