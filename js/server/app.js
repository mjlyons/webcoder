const express = require('express');
const path = require('path');
// const logger = require('morgan');  // uncomment for access logging
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('js/server/routes/index');
const users = require('js/server/routes/users');
const testroutes = require('js/server/routes/testroutes');

const app = express();

// view engine setup
app.set('views', path.join(process.env.PWD, './server/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));  // uncomment for access logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, '../../static')));

// Allows javascript (at webcoder:8080) to access all routes on server
app.use((_req, res, next) => {
  // Uncomment/modify the following if static client html is hosted on a different domain
  // res.setHeader('Access-Control-Allow-Origin', '[STATIC_HTML_HOST]');
  // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/test', testroutes);

// catch 404 and forward to error handler
app.use(function routeNotFoundError(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function routeDevelopmentError(err, _req, res, _next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function routeProductionError(err, _req, res, _next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
