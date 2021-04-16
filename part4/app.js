const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const tokenExtractor = require('./utils/token');
const userExtractor = require('./utils/user_extractor');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const errorHandler = require('./utils/error');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(cors());
app.use(express.json());

app.use(tokenExtractor);
app.use('/api/blogs', userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if(process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/tests');
  app.use('/api/testing', testRouter);
}

app.use(errorHandler);

module.exports = app;