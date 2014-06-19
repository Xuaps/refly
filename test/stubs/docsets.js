var filters = require('../../app/filters');

exports._collection = [];

exports.filter = function(field, operator, value) {
    exports._collection = exports._collection.filter(function(reference) {
        if (operator == filters.operators.EQUALS) {
            return reference[field] == value;
        } else if (operator == filters.operators.IN) {
            return value.indexOf(reference[field]) != -1;
        }
    });
    return exports;
};

exports.then = function(callback) {
    callback(exports._collection);
};
