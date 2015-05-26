var GithubStrategy = require('passport-github').Strategy;
var Users = require('../users.js');
var config = require('config');

module.exports.create = function(callbackURL){
    var strategy = new GithubStrategy( _getOptions(callbackURL), _verifier);
    strategy.name= 'github';
    strategy.scope = ['user:email'];

    return strategy;
};

var _getOptions = function(callbackURL){
    return {
            clientID: config.auth.providers.github.clientID,
            clientSecret: config.auth.providers.github.clientSecret,
            callbackURL: config.auth.host + callbackURL
        };
};

var _verifier = function(accessToken, refreshToken, profile, done) {
    new Users().findOrCreate({
          profile_id: profile.id, 
          profile_provider:'github', 
          email: profile.emails[0].value, 
          auth_token: accessToken 
        }).then(function(user){
          done(null, user);
        }).catch(done);
};
