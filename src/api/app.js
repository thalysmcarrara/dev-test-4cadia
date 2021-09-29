const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

const userRouter = require('./routers/userRouter');

app.use('/register', userRouter);

module.exports = app;