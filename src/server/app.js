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
var queries = require("../../queries2");
var Promise = require('bluebird');
var passport = require('passport');
var knex = require('../../db/knex');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
if ( !process.env.NODE_ENV ) { require('dotenv').config();}



// *** routes *** //
var routes = require('./routes/index.js');
var authRoutes = require('./routes/auth.js');
var userRoutes = require('./routes/users.js');
var adminRoutes = require('./routes/admin.js');
var cultureRoutes = require('./routes/index.js');



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


// *** protect user routes *** //

app.use('/user', function (req, res, next) {
  //console.log(req.user);
  if(!req.user) {
    //console.log('denied');
    res.redirect('/login');
  } else {
    next();
  }
});

// *** google auth *** //
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    knex('users')
      .where('email', profile.email)
      .orWhere('google_id', profile.id).then(function(user) {
      if(user.length) {
        return done(null, user[0]);
      } else {
        var newUser = {
          google_id: profile.google_id,
          email: profile.email,
          fname: profile.name.givenName,
          lname: profile.name.familyName
        };
        queries.registerUserGoogle(newUser).then(function (userAdded) {
          //console.log('----- user:', req.user);
          //console.log("user id yo: " + id);
          return done(null, userAdded[0]);
        });
      }
    });

    }));


passport.serializeUser(function(user, done) {
  done(null, user.id);
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
app.use('/cultures', cultureRoutes);



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
