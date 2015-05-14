var db = require('./db');

function Users(){
    this._query = db('users');
} 

Users.prototype.getBySessionId = function(client_id){
    return this._query.innerJoin('clients', 'users.id', 'clients.user_id')
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

Users.prototype.execute = function() {
    return this._query.then(
            function(rows){
                this._query = db('users');
                return rows;
            }.bind(this));
};

module.exports = Users;
