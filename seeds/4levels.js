
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('levels').del(),

    // Inserts seed entries
    knex('levels').insert({
        name: 'Interested, 0 years experience'
    }),
    knex('levels').insert({
        name: 'Some experience, 1-2 years'
    }),
    knex('levels').insert({
        name: 'Intermediate, 3-5 years experience'
    }),
    knex('levels').insert({
        name: 'Skilled, 5+ years experience'
    })
  );
};
