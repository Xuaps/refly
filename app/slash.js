var q = require('q'); 
var docsets = require('./docsets');
var filters = require('./filters');

var search = function(options) {
    var deferred = q.defer();
    docsets
        .filter('docset', filters.operators.IN, options.docsets)
        .filter('reference', filters.operators.EQUALS, options.reference)
        .filter('type', filters.operators.IN, options.types)
        .select(['docset', 'reference', 'type'])
        .then(function(references) {
            deferred.resolve(references);
        });
    return deferred.promise;
};

exports.search = search;
