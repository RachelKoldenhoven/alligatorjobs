
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('resources').del(),

    // Inserts seed entries
    knex('resources').insert({
        name: 'The Translation and Interpreting Center',
        website: 'http://www.ticenterdenver.com',
        phone: '3039960976',
        culture_id: 1
    }),
    knex('resources').insert({
        name: 'The Translation and Interpreting Center',
        website: 'http://www.ticenterdenver.com',
        phone: '3039960976',
        culture_id: 2
    }),
    knex('resources').insert({
        name: 'The Translation and Interpreting Center',
        website: 'http://www.ticenterdenver.com',
        phone: '3039960976',
        culture_id: 3
    }),
    knex('resources').insert({
        name: 'The Translation and Interpreting Center',
        website: 'http://www.ticenterdenver.com',
        phone: '3039960976',
        culture_id: 4
    }),
    knex('resources').insert({
        name: 'The Translation and Interpreting Center',
        website: 'http://www.ticenterdenver.com',
        phone: '3039960976',
        culture_id: 5
    }),
    knex('resources').insert({
        name: 'Liason Multilingual',
        website: 'http://emultilingual.com/services',
        phone: '3037620997',
        culture_id: 5
    }),
    knex('resources').insert({
        name: 'Liason Multilingual',
        website: 'http://emultilingual.com/services',
        phone: '3037620997',
        culture_id: 1
    }),
    knex('resources').insert({
        name: 'Somali American Community Center of Colorado',
        website: 'http://www.somaliamerican.org/',
        phone: '3033695998',
        culture_id: 1
    }),
    knex('resources').insert({
        name: 'Burma Community Rangers of Denver Colorado',
        website: 'http://www.bcrco.org/',
        culture_id: 2
    })
  );
};
