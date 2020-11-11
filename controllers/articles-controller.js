const { fetchArticle, updateArticle} = require("../models/articles-model");

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
      updateArticle(req.params.article_id, req.body.inc_votes, articles[0].votes).then((updatedArticle) => {
      res.status(200).send({ updatedArticle });
  })
})
  .catch(next)
}
