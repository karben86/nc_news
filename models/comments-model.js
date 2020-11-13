const connection = require("../db/data/connection");

exports.createNewComment = (newComment) => {
    return connection
      .insert(newComment)
      .into("comments")
      .returning("*")
  };

  exports.fetchComments = (article_id, sort_by, order) => {
    return connection
    .select("*")
    .from("comments")
    .orderBy(sort_by, order)
    .where({article_id})
  }
  
  exports.fetchComment = (comment_id) => {
    return connection
    .select("*")
    .from("comments")
    .where({comment_id})
  }

  exports.updateComment = (comment_id, updatedValue, currentVotes) => {
    return connection("comments")
      .where({ comment_id })
      .update("votes", updatedValue + currentVotes)
      .returning("*");
  };

  exports.eraseComment = (comment_id) => {
    return connection("comments").where({ comment_id }).del();
  };