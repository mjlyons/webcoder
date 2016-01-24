const express = require('express');
const path = require('path');
// const logger = require('morgan');  // uncomment for access logging
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const SessionFileStore = require('session-file-store')(expressSession);
const routes = require('js/server/routes/index');
// const users = require('js/server/routes/users');  // TODO(mike): Is this okay to remove?
const testroutes = require('js/server/routes/testroutes');
const { SESSION_SECRET } = require('settings')();

const passport = require('passport');
const LocalPassportStrategy = require('passport-local').Strategy;
const users = require('js/server/users');
const buildsettings = require('buildsettings');

passport.use(new LocalPassportStrategy((username, password, done) => {
  users.findByUsername(username, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!users.isPasswordValidForUser(user, password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  users.findById(id, (err, user) => {
    done(err, user);
  });
});

const app = express();

// view engine setup
app.set('views', path.join(process.env.PWD, './server/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));  // uncomment for access logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new SessionFileStore({
    path: './build/sessions',
    ttl: (60 * 60 * 24 * 7),  // 1 week
  }),
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(path.join(__dirname, '../../static')));

// Allows javascript (at webcoder:8080) to access all routes on server
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', buildsettings.CLIENT_HOST);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', routes);
// TODO(mike): Is this okay to remove?
// app.use('/users', users);
app.use('/test', testroutes);

app.get('/login', (req, res) => {
  res.render('login', {});
});
app.post('/login', passport.authenticate('local', { successRedirect: '/editor', failureRedirect: '/login' }));
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

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
