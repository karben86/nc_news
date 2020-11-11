const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const {handleInternalErrors, handlePSQLErrors, send404} = require('./controllers/errorhandling')

app.use(express.json());

app.use('/api', apiRouter);
app.all('/*', send404);
app.use(handleInternalErrors);
app.use(handlePSQLErrors);

module.exports = app;