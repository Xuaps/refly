var db = require('./db');
var config = require('config');
var Mailer = require('./mailer.js');

function Users(){
} 

Users.prototype.find = function(values){
    return db('users')
        .where(values)
        .then(function(users){
            if(users.length !== 1)
                return [];
            return users[0];
        });
};

Users.prototype.revokeAccessToken = function(values){
    return db('users')
        .update({auth_token: undefined})
        .where(values);
}; 

Users.prototype.findOrCreate = function(user){
    var _that = this;
    var sendmail = true;
    var fakemail;
    return _that._getByProfile(user.profile_id, user.profile_provider).then(function(users){
        if(!_that._validEmail(user.email)){
            fakemail = user.profile_provider + '-user' + Math.ceil(Math.random() * (999999 - 100000) + 100000) + '@refly.xyz';
            sendmail = false;
        }

        if(users.length===0){
            if(fakemail){
                user.email = fakemail;
            }
            if(sendmail)
                Mailer.sendMailTemplated(user.email, config.templates.welcome);
            return _that.add(user);
        }else{
            if(fakemail)
                user.email = users[0].email;

            if(_that._haveChanges(users[0], user)){
                return _that.update(user);
            }
            return users[0];
        }
    });
};

Users.prototype._validEmail = function(email){
    re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
};

Users.prototype._getByProfile = function (profile_id, profile_provider){
    return db('users')
        .where('users.profile_id', profile_id)
        .andWhere('users.profile_provider', profile_provider);
};

Users.prototype.add = function (user){
    return db('users')
        .insert(user, 'id')
        .into('users')
        .then(function(ids){
            return user; 
    });
};

Users.prototype.update = function(user){
    return db('users')
            .where('users.profile_id', user.profile_id)
            .update(user)
            .then(function(){
                return user;
            });
};

Users.prototype._haveChanges = function(old, newest){
    return old.email!==newest.email || old.auth_token!==newest.auth_token;
};

module.exports = Users;
