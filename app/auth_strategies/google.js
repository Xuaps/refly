var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Users = require('../users.js');
var config = require('config');

module.exports.create = function(callbackURL){
    var strategy = new GoogleStrategy( _getOptions(callbackURL), _verifier);
    strategy.name= 'google';
    strategy.scope = 'openid profile email';

    return strategy;
};

var _getOptions = function(callbackURL){
    return {
            clientID: config.auth.providers.google.clientID,
            clientSecret: config.auth.providers.google.clientSecret,
            callbackURL: config.auth.host + callbackURL
        };
};

var _verifier = function(accessToken, refreshToken, profile, done) {
    new Users().findOrCreate({
          profile_id: profile.id, 
          profile_provider:'google', 
          email: profile.emails[0].value, 
          auth_token: accessToken 
        }).then(function(user){
          done(null, user);
        }).catch(done);
};
