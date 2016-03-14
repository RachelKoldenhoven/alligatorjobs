exports.up = function(knex, Promise) {
  return knex.schema.createTable('resources', function(table){
    table.increments('id').primary();
    table.string('name');
    table.string('website');
    table.string('phone', 9);
    table.integer('culture_id').references('cultures(id)');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('resources');
};