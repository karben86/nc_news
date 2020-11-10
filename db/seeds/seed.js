const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const { formatDates, formatAuthor, formatComments, createTitleRef } = require("../utils/data-manipulation");

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
     //   console.log(articleData)
      const formattedDateArticleData = formatDates(articleData);
      return knex("articles").insert(formattedDateArticleData).returning("*");
    })
    .then((response) => {
     const step1 = formatAuthor(commentData);
     const commentRef = createTitleRef(response);
     const formattedCommentData = formatComments(step1, commentRef)
      return knex("comments").insert(formattedCommentData).returning("*");
    })
    .then((res) =>{
      console.log(res);
    })
};
