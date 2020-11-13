const { createNewComment, fetchComments, fetchComment, updateComment, eraseComment} = require("../models/comments-model");

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
    if (req.query.sort_by === undefined) req.query.sort_by = "created_at";
    if (req.query.order === undefined) req.query.order = "desc";
    fetchComments(req.params.article_id, req.query.sort_by, req.query.order)
    .then((comments) => {
      if (req.query.order !== "asc" && req.query.order !== "desc") return Promise.reject({status: 400, msg: "Bad Request"});
      res.status(200).send({ comments });
    })
    .catch(next);
  }

  exports.patchComment = (req, res, next) => {
    fetchComment(req.params.comment_id)
    .then((comment) => {
        if (isNaN(req.body.inc_votes) || Object.keys(req.body).length > 1) return Promise.reject({status: 400, msg: "Bad Request"});
        updateComment(req.params.comment_id, req.body.inc_votes, comment[0].votes)
        .then((updatedComment) => {
          res.status(200).send({ updatedComment });
        })
      })
    .catch(next)
  }

  exports.deleteComment = (req, res, next) => {
    eraseComment(req.params.comment_id).then(() => {
      res.sendStatus(204);
    });
  };