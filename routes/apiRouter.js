const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter')
const usersRouter = require('./usersRouter')
const articlesRouter = require('./articlesRouter')
const commentsRouter = require('./commentsRouter')
const endpoints = {
"Description": "The following endpoints are available via standard http methods:",
"Endpoints": {
    "/api": ["GET"],
    "/api/topics": ["POST", "GET"],
    "/api/users/:username": ["GET"],
    "/api/articles": ["POST", "GET"],
    "/api/articles/:article_id": ["DELETE", "PATCH", "GET"],
    "/api/articles/:article_id/comments": ["POST", "GET"],
    "/api/comments/:comment_id": ["PATCH", "DELETE"]
    }
}

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.route('/').get((req, res) => res.send(endpoints))



module.exports = apiRouter;