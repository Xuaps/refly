var BearerStrategy = require('passport-http-bearer').Strategy;
var Users = require('../users.js');
var config = require('config');

module.exports.create = function(){
    var strategy = new BearerStrategy( _verifier);
    strategy.name= 'bearer';

    return strategy;
};

var _verifier = function(token, done) {
    new Users().find({auth_token: token}).then(function(user){
          if (!user) { return done(null, false); }
          return done(null, user[0], { scope: 'all' });
        }).catch(done);
};
