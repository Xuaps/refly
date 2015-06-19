var db = require('./db');
var config = require('config');
var stripe = require('stripe')(config.stripe.secret_key);

function Users(){
} 

Users.prototype.find = function(values){
    return db('users')
        .where(values)
        .then(function(users){
            if(users.length !== 1)
                return;
            if(!users[0].stripe_id)
                return users;

            console.log(config.stripe.secret_key)
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
    return _that._getByProfile(user.profile_id, user.profile_provider).then(function(users){
        if(users.length===0)
            return _that.add(user);
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
