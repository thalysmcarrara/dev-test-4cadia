const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

const signupRouter = require('./routers/signupRouter');

app.use('/register', signupRouter);

module.exports = app;