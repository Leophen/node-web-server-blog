const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

const app = express();
const cors = require('cors');
const session = require('express-session');
const RedisStore = require("connect-redis")(session);
const redisClient = require('./db/redis');

// CORS 跨域
app.use(cors({
  origin: 'http://localhost:8001',
  allowedHeaders: 'Content-Type',
  credentials: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 操作 Session，每次请求时生成随机 session
app.use(session({
  secret: 'leophen_0810#',  // 密匙
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24小时后失效
  },
  // Redis 存储 Session
  store: new RedisStore({ client: redisClient }),
}))

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
