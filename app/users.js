var db = require('./db');
var config = require('config');
var stripe = require('stripe')(config.stripe.secret_key);
var mandrillappMailer = require('./mandrillapp-mailer.js');

function Users(){
} 

Users.prototype.find = function(values){
    return db('users')
        .where(values)
        .then(function(users){
            if(users.length !== 1)
                return [];
            if(!users[0].stripe_id)
                return users;

            return stripe.customers.retrieve(users[0].stripe_id)
                .then(function(customer){
                    var activePlan = customer.subscriptions.data[0] && (customer.subscriptions.data[0].status === 'active');
                    users[0].haveActivePlan = activePlan;
                    return users;
                });
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
    return _that._getByProfile(user.profile_id, user.profile_provider).then(function(users){
        re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if(user.email == '' || !re.test(user.email)){
            user.email = user.profile_provider + '-user' + Math.ceil(Math.random() * (999999 - 100000) + 100000) + '@refly.xyz';
            sendmail = false;
        }

        if(users.length===0)
            return _that.add(user, sendmail);
        if(_that._haveChanges(users[0], user)){
            return _that.update(user);
        }
        return users[0];
    });
};

Users.prototype._getByProfile = function (profile_id, profile_provider){
    return db('users')
        .where('users.profile_id', profile_id)
        .andWhere('users.profile_provider', profile_provider);
};

Users.prototype.add = function (user,sendmail){
    if(sendmail)
        mandrillappMailer.sendMailTemplated(user.email, config.templates.welcome);
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
