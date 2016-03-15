
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
        fname: 'Dan',
        lname: 'Klein',
        phone: '8888888888',
        email: 'danhirschklein@gmail.com',
        password: 'test',
        admin: true
    }),
    knex('users').insert({
        fname: 'Rachel',
        lname: 'Koldenhoven',
        email: 'rachel@koldenfrozen.com',
        password: 'password',
        admin: true
    }),
    knex('users').insert({
        fname: 'Valerie',
        lname: 'Kraucunas',
        email: 'valeriekraucunas@gmail.com',
        password: 'password',
        admin: true
    })
  );
};
