var filters = require('../app/filters');

var knex = require('knex')({
    client: 'postgres',
    connection: {
        host     : '127.0.0.1',
        user     : 'postgres',
        database : 'slashdb'
    }
});

var _query = null;

exports.filter = function(field, operator, value) {
    _query = _query || knex.select().table('refs');
    if (operator == filters.operators.EQUALS) {
        _query = _query.where(field, value);
    }
    if (operator == filters.operators.IN) {
        _query = _query.whereIn(field, value);
    }
    return exports;
};

exports.select = function(columns){
    _query = _query.select(columns);
    return exports;
}

exports.then = function(callback) {
    return _query.then(callback);
};
