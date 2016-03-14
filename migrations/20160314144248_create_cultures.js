exports.up = function(knex, Promise) {
  return knex.schema.createTable('cultures', function(table){
    table.increments('id').primary();
    table.string('name');
    table.string('why');
    table.string('phrases_link');
    table.string('foods');
    table.string('holidays');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cultures');
};