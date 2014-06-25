var q = require('q'); 
var docsets = require('./docsets');
var filters = require('./filters');

exports.search = function(options) {
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

exports.get = function(identity){
	var deferred = q.defer();
	docsets
        .filter('docset', filters.operators.EQUALS, identity.docset)
        .filter('reference', filters.operators.EQUALS, identity.reference)
        .filter('type', filters.operators.EQUALS, identity.type)
        .select(['docset', 'reference', 'type', 'content'])
        .then(function(references) {
            deferred.resolve(references[0]);
        });
    return deferred.promise;
}