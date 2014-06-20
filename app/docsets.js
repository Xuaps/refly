var filters = require('../app/filters');

var knex = require('knex')({
    client: 'postgres',
    connection: {
        host     : '127.0.0.1',
        user     : 'slash',
        password : 'slash1234',
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

exports.then = function(callback) {
    return _query.then(callback);
};