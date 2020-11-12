const connection = require("../db/data/connection");

exports.fetchArticle = (article_id) => {
  return connection
    .select("articles.*")
    .from("articles")
    .where({"articles.article_id" : article_id})
    .count("comment_id AS comment_count")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
};

exports.updateArticle = (article_id, updatedValue, currentVotes) => {
  return connection("articles")
    .where({ article_id })
    .update("votes", updatedValue + currentVotes)
    .returning("*");
};

exports.eraseArticle = (article_id) => {
  return connection("articles").where({ article_id }).del();
};