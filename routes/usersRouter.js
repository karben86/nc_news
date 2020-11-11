const usersRouter = require('express').Router();
const {getUser} = require('../controllers/users-controller');
const { send405 } = require("../controllers/errorhandling");


usersRouter.route('/:username').get(getUser);
usersRouter.all("/", send405);

module.exports = usersRouter;