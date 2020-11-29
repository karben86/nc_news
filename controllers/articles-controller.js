const { fetchArticles, fetchArticle, updateArticle, eraseArticle, countArticles } = require("../models/articles-model");
const { isValidTopic } = require("../models/topics-model");
const { isValidAuthor } = require("../models/users-model");

exports.getArticles = (req, res, next) => {
  if (req.query.sort_by === undefined) req.query.sort_by = "created_at";
  if (req.query.order === undefined) req.query.order = "desc";
  if (req.query.limit === undefined) req.query.limit = 10;
  if (req.query.p === undefined) req.query.p = 1;
  fetchArticles(req.query.sort_by, req.query.order, req.query.author, req.query.topic, req.query.limit, req.query.p)
    .then((articles) => {
      if (req.query.order !== "asc" && req.query.order !== "desc" || isNaN(req.query.limit) || isNaN(req.query.p)) return Promise.reject({status: 400, msg: "Bad Request"});
      if (articles.length === 0) {
        return Promise.all([articles, isValidTopic(req.query.topic), isValidAuthor(req.query.author)]);
      } else return [articles, true, true];
    })
    .then(([articles, checkTopic, checkAuthor]) => {
      if (!checkTopic) {
        return Promise.reject({
          status: 404,
          msg: "Topic Not Found"
        })
      }
      if (!checkAuthor) {
        return Promise.reject({
          status: 404,
          msg: "Author Not Found"
        })
      }
      res.status(200).send({ articles });
    })
    .catch(next)
  };

exports.getArticle = (req, res, next) => {
  fetchArticle(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
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

exports.getCount = (req, res, next) => {
  countArticles(req.query.author, req.query.topic)
  .then((res) => {
  console.log(res);
  })
}