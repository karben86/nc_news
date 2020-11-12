const connection = require("../db/data/connection");

exports.createNewComment = (newComment) => {
    return connection
      .insert(newComment)
      .into("comments")
      .returning("*")
  };

  exports.fetchComments = (article_id, sort_by, order) => {
    console.log(sort_by)
    return connection
    .select("*")
    .from("comments")
    .orderBy(sort_by, order)
    .where({article_id})
  }