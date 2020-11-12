const { createNewComment, fetchComments } = require("../models/comments-model");

exports.postComment = (req, res, next) => {
  req.body.author = req.body.username;
  req.body.article_id = +req.params.article_id;
  delete req.body.username;
    createNewComment(req.body)
    .then((newComment) => {
      res.status(201).send({ newComment });
    })
    .catch(next);
  };

  exports.getComments = (req, res, next) => {
    fetchComments(req.params.article_id, req.query.sort_by = "created_at", req.query.order = "desc")
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
  }