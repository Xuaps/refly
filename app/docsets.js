var filters = require('../app/filters');

var knex = require('knex')({
    client: 'postgres',
    connection: {
        host     : '127.0.0.1',
        user     : 'postgres',
        database : 'slashdb'
    }
});

function Docsets(){
    this._query = knex.select().table('refs');
} 

Docsets.prototype.filter = function(field, operator, value) {
    if (operator == filters.operators.EQUALS) {
        this._query = this._query.where(field, value);
    }
    if (operator == filters.operators.IN && value) {
        this._query = this._query.whereIn(field, value);
    }
    return this;
};

Docsets.prototype.select = function(columns){
    this._query = this._query.select(columns);
    return this;
}

Docsets.prototype.then = function(callback) {
    return this._query.then(callback);
};

Docsets.prototype.addRefsRange = function(refs) {

    return knex('refs').insert(refs);
};

module.exports = Docsets; 