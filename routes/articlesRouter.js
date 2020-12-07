const articlesRouter = require('express').Router();
const {getArticles, getArticle, patchArticle, deleteArticle, getCount} = require('../controllers/articles-controller');
const {postComment, getComments} = require('../controllers/comments-controller');

articlesRouter.route('/:article_id').get(getArticle).patch(patchArticle).delete(deleteArticle);
articlesRouter.route('/:article_id/comments').post(postComment).get(getComments);
articlesRouter.route('/').get(getArticles)

module.exports = articlesRouter;