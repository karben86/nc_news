const connection = require("../db/data/connection");

exports.fetchArticles = (sort_by, order, author, topic) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count("comment_id AS comment_count")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify((query) => {
      if (author) {
        query.where("articles.author", "=", author)
      }
      if (topic) {
        query.where("articles.topic", "=", topic)
      }
    })
};

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