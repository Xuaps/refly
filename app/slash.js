var q = require('q'); 
var docsets = require('./docsets');
var filters = require('./filters');

var search = function(options) {
    var deferred = q.defer();
    deferred.resolve(docsets
        .filter('reference', filters.operators.EQUALS, options.reference)
        .filter('type', filters.operators.IN, options.types)
        .toArray()
    );
    return deferred.promise;
};

exports.search = search;
