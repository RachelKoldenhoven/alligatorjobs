
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('work_exp').del(),

    // Inserts seed entries
    knex('work_exp').insert({
        id: 1,
        user_id: '1',
        skill_id: '20',
        level_id: '2'
        }),
    knex('work_exp').insert({
        id: 2,
        user_id: '1',
        skill_id: '17',
        level_id: '1'
        }),
    knex('work_exp').insert({
        id: 3,
        user_id: '1',
        skill_id: '20',
        level_id: '2'
        }),
    knex('work_exp').insert({
        id: 4,
        user_id: '2',
        skill_id: '8',
        level_id: '1'
        }),
    knex('work_exp').insert({
        id: 5,
        user_id: '2',
        skill_id: '25',
        level_id: '3'
        }),
    knex('work_exp').insert({
        id: 6,
        user_id: '3',
        skill_id: '19',
        level_id: '2'
        })


  );
};
