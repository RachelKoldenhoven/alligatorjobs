exports.up = function(knex, Promise) {
  return knex.schema.createTable('work_exp', function(table){
    table.increments('id').primary();
    table.integer('user_id').references('users(id)');
    table.integer('skill_id').references('skills(id)');
    table.integer('level_id').references('levels(id)');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('work_exp');
};