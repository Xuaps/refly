var filters = require('../app/filters');
var util = require('util');
var db = require('./db');

function Docsets(){
    this._query = db('docsets');
    this._querydocsetsxusers = db('docsetsxuser')
} 

Docsets.prototype.filter = function(field, operator, value) {
    if (operator == filters.operators.EQUALS) {
        this._query = this._query.where(field, value);
    }
    if (operator == filters.operators.IN && value) {
        this._query = this._query.whereIn(field, value);
    }
    if (operator == filters.operators.CONTAINS && value){
        this._query = this._query.where(field, 'ilike', '%'+value+'%');
    }
    if (operator == filters.operators.START_WITH && value){
        this._query = this._query.where(field, 'ilike', value+'%');
    }
    return this;
};

Docsets.prototype.select = function(columns){
    this._query = this._query.select(columns);
    return this;
};

Docsets.prototype.docsetsbyuser = function(user){
    this._query = this._query.innerJoin('docsetsxuser', 'docsetsxuser.docset', 'docsets.docset')
    this._query = this._query.innerJoin('users', 'docsetsxuser.user', 'users.id')
        .where('users.id', filters.operators.IN , user);
    return this;
};

Docsets.prototype.savedocsetxuser = function(user,docsets){
    var insertingdocsets = [];
    return db.transaction(function(trx){
        docsets.forEach(function(docset){
            insertingdocsets.push({user: user, docset: docset})
        });
        return db('docsetsxuser').transacting(trx).del().where({user: user})
        .then(function(){
            return trx.insert(insertingdocsets)
                    .into('docsetsxuser')
        });
    });
};

Docsets.prototype.order = function(column, direction){
    this._query = this._query.orderBy(column, direction);
    return this;
};

Docsets.prototype.execute = function() {
    return this._query.then(
        function(rows){
            this._query = db('docsets');
            return rows;
        }.bind(this), 
        function(err){
            return err;
        });
};

module.exports = Docsets; 
