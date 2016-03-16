// *** main dependencies *** //
//require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var cookieSession = require('cookie-session');
var Promise = require('bluebird');
var passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
if ( !process.env.NODE_ENV ) { require('dotenv').config();}



// *** routes *** //
var routes = require('./routes/index.js');
var authRoutes = require('./routes/auth.js');
var userRoutes = require('./routes/users.js');
var adminRoutes = require('./routes/admin.js');


// *** express instance *** //
var app = express();


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'google-oauth-session-example',
  keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/image')));

// *** google auth *** //
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log("prof", profile);
    process.nextTick(function() {
      console.log(profile);
      return done(null, {
        fname: profile.name.givenName,
        lname: profile.name.familyName,
        google_id: profile.id,
        email: profile.email});
      });
    }));


passport.serializeUser(function(user, done) {
  //later this will be where you selectively send to the browser
  // an identifier for your user, like their primary key from the
  // database, or their ID from linkedin

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // here is where you will go to the database and get the
  // user each time from it's id, after you set up your db
  done(null, user)
});


// *** main routes *** //
app.use('/', routes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//app.listen(3001, function() {
//  console.log('Express app listening on port 3001');
//});


module.exports = app;
