var db = require('./db');
var filters = require('./filters');
function Users(){
    this._query = db('users');
} 

Users.prototype.getBySessionId = function(client_id){
    this._query = this._query.innerJoin('clients', 'users.id', 'clients.user_id')
        .where('clients.id', filters.operators.EQUAL, client_id);
    return this.execute().then(function(rows){ return rows[0]; });
};

Users.prototype.createNewAnonymousUser = function(client_id){
    return undefined;
};

Users.prototype.execute = function() {
    return this._query.then(
            function(rows){
                this._query = db('users');
                return rows;
            }.bind(this),
            function(err){
                return err;
            });
};

module.exports = Users;
