const { fetchArticle, updateArticle, eraseArticle } = require("../models/articles-model");

exports.getArticle = (req, res, next) => {
  fetchArticle(req.params.article_id)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next)
};

exports.patchArticle = (req, res, next) => {
  fetchArticle(req.params.article_id)
    .then((articles) => {
      if (isNaN(req.body.inc_votes) || Object.keys(req.body).length > 1) return Promise.reject({status: 400, msg: "Bad Request"});
      updateArticle(req.params.article_id, req.body.inc_votes, articles[0].votes).then((updatedArticle) => {
      res.status(200).send({ updatedArticle });
  })
})
  .catch(next)
}

exports.deleteArticle = (req, res, next) => {
  eraseArticle(req.params.article_id).then(() => {
    res.sendStatus(204);
  });
};
