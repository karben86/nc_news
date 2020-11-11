const articlesRouter = require('express').Router();
const {getArticle, patchArticle} = require('../controllers/articles-controller');
const { send405 } = require("../controllers/errorhandling");


articlesRouter.route('/:article_id').get(getArticle).patch(patchArticle);
articlesRouter.all("/", send405);

module.exports = articlesRouter;