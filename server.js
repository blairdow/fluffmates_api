var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');
var cookieParser = require('cookie-parser');

// Load local libraries.
var env      = require('./config/environment'),
    mongoose = require('./config/database'),
    routes   = require('./config/routes');

// Instantiate a server application.
var app = express();

// Configure the application (and set it's title!).
app.set('title', env.TITLE);
app.set('safe-title', env.SAFE_TITLE);

// Create local variables for use thoughout the application.
app.locals.title = app.get('title');

// Logging layer.
app.use(logger('dev'));

// Helper layer (parses the requests, and adds further data).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser('notsosecretnowareyou'));

// Enable CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, x-access-token, content-type, Authorization');
  next();
});

// Routing layers: favicon, static assets, dynamic routes, or 404…

// Routes to static assets. Uncomment below if you have a favicon.
 app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Useful for debugging the state of requests.
app.use(debugReq);

// Defines all of our "dynamic" routes.
app.use('/', routes);



// Error-handling layer.
app.use(function(err, req, res, next) {
  // In development, the error handler will print stacktrace.
  err = (app.get('env') === 'development') ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:',  req.query);
  debug('body:',   req.body);
  next();
}

module.exports = app;
