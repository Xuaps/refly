var q = require('q'); 
var docsets = require('./docsets');

var search = function(options) {
    var deferred = q.defer();
    var results = docsets.filter(options.docsets).map(function(docset) {
        return docset.getReferences().filter(options.types);
    }).map(function(references) {
        return references.filter(options.reference);
    });
    deferred.resolve(results.toArray());
    return deferred.promise;
};

exports.search = search;
