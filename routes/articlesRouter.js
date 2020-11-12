const articlesRouter = require('express').Router();
const {getArticle, patchArticle, deleteArticle} = require('../controllers/articles-controller');
const {postComment, getComments} = require('../controllers/comments-controller');
const { send405 } = require("../controllers/errorhandling");
const apiRouter = require('./apiRouter');


articlesRouter.route('/:article_id').get(getArticle).patch(patchArticle).delete(deleteArticle);
articlesRouter.route('/:article_id/comments').post(postComment).get(getComments);
articlesRouter.all("/", send405);

module.exports = articlesRouter;