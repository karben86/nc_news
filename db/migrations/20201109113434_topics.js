
exports.up = function(knex) {
  return knex.schema.createTable('topics', (topicsTable) => {
      topicsTable.text('slug').primary();
      topicsTable.text('description');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('topics');
};
