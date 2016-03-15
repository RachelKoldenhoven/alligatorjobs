exports.up = function(knex, Promise) {
  return knex.schema.createTable('addresses', function(table){
    table.increments('id').primary();
    table.integer('user_id').references('users(id)');
    table.string('line_1');
    table.string('line_2');
    table.string('city');
    table.string('state');
    table.string('zip', 5);
    table.date('create_date');
    table.date('update_date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('addresses');
};