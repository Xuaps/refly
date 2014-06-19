var q = require('q'); 
var docsets = require('./docsets');

var search = function(options) {
    var deferred = q.defer();
    deferred.resolve(docsets.filter(function(reference) {
        return reference.reference == options.reference
            && options.types.indexOf(reference.type) != -1;
    }));
    return deferred.promise;
};

exports.search = search;
