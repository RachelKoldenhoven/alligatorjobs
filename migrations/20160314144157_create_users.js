exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id').primary();
    table.string('fname').notNullable();
    table.string('lname').notNullable();
    table.string('phone', 9);
    table.string('email').notNullable().unique();
    table.string('password');
    table.string('google_id');
    table.string('english');
    table.string('other_skills', 500);
    table.boolean('admin').default(false);
    table.integer('case_worker_id');
    table.date('create_date');
    table.date('update_date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
