var db = require('./db');

function Users(){
} 

Users.prototype.getBySessionId = function(client_id){
    return db('users').innerJoin('clients', 'users.id', 'clients.user_id')
        .where('clients.id', client_id)
   .then(function(rows){ return rows.length>0?rows[0]:undefined; });
};

Users.prototype.createNewAnonymousUser = function(client_id){
    return db.transaction(function(trx){
        var user = {email:Date.now()+'@anonymous'};
        return trx.insert(user, 'id')
                .into('users')
                .then(function(ids){
                    return trx.insert({id:client_id,user_id:ids[0]})
                            .into('clients')
                            .then(function(){
                                return user;
                            });
                });
    });
};

Users.prototype.findOrCreate = function(user){
    var _that = this;
    return _that.getByProfileId(user.profile_id).then(function(users){
        if(users.length===0)
            return _that.add(user);
        if(_that._haveChanges(users[0], user)){
            return _that.update(users[0].id, user);
        }
        return users[0];
    });
};

Users.prototype.getByProfileId = function (profile_id){
    return db('users')
        .where('users.profile_id', profile_id);
};

Users.prototype.add = function (user){
    return db('users')
        .insert(user, 'id')
        .into('users')
        .then(function(ids){ 
            user.id=ids[0];
            return user; 
    });
};

Users.prototype.update = function(id, user){
    return db('users')
            .where('users.profile_id', user.profile_id)
            .update({email:user.email, auth_token: user.auth_token})
            .then(function(){
                user.id = id; 
                return user;
            });
};

Users.prototype._haveChanges = function(old, newest){
    return old.email!==newest.email || old.auth_token!==newest.auth_token;
};

module.exports = Users;
