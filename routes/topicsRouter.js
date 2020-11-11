const topicsRouter = require('express').Router();
const {getTopics} = require('../controllers/topics-controller');
const { send405 } = require("../controllers/errorhandling");


topicsRouter.route('/').get(getTopics);
topicsRouter.all("/", send405);

module.exports = topicsRouter;