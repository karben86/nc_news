const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const { formatDates, formatAuthor } = require("../utils/data-manipulation");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex("users").insert(userData).returning("*");
    })
    .then(() => {
      // console.log(topicData)
      return knex("topics").insert(topicData).returning("*");
    })
    .then(() => {
      //  console.log(articleData)
      const formattedDateArticleData = formatDates(articleData);
      return knex("articles").insert(formattedDateArticleData).returning("*");
    })
    .then(() => {
     // console.log(commentData)
     const formattedCommentData = formatAuthor(commentData)
      //return knex("articles").insert(formattedDateArticleData).returning("*");
    })
};
