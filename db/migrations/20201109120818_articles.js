exports.up = function (knex) {
  console.log("creating the articles table");
  return knex.schema.createTable("articles", (articleTable) => {
    articleTable.increments("article_id").primary();
    articleTable.text("title");
    articleTable.text("body");
    articleTable.integer("votes").defaultTo(0);
    articleTable.text("topic").references("topics.slug");
    articleTable.text("author").references("users.username");
    articleTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  console.log("dropping articles table");
  return knex.schema.dropTable("articles");
};
