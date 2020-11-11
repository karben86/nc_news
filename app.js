const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const {handleInternalError} = require('./controllers/errorhandling')

app.use(express.json());

app.use('/api', apiRouter);

app.use(handleInternalError);
module.exports = app;