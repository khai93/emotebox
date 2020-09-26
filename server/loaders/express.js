const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require("../api");
const config = require("../config")
const session = require('express-session');
const Strategy = require("passport-discord").Strategy;
const expressValidator = require("express-validator");
const passport = require("passport");

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new Strategy({
  clientID: config.discord.clientID,
  clientSecret: config.discord.clientSecret,
  callbackURL: config.api.baseURL + config.api.prefix + "/auth/discord-callback",
  scope: config.discord.scopes,
  prompt: config.discord.prompt
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
      return done(null, profile)
  })
}));

module.exports = async (app) => {

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(session({
    secret: config.authSecret,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Load API routes
  app.use(config.api.prefix, routes());

  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

  return app;
}