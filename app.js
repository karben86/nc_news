const express = require('express');
const app = express();
const apiRouter = require('./routes/apiRouter');
const {handleInternalErrors, handlePSQLErrors, handleCustomErrors, send404} = require('./controllers/errorhandling')

app.use(express.json());

app.use('/api', apiRouter);
app.all('/*', send404);

// error handlers
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleInternalErrors);

module.exports = app;