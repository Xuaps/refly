var Docsets = require('./docsets');
var filters = require('./filters');

exports.search = function(options) {
    docsets = new Docsets();
    return docsets
        .filter('docset', filters.operators.IN, options.docsets)
        .filter('reference', filters.operators.CONTAINS, options.reference)
        .filter('type', filters.operators.IN, options.types)
        .select(['docset', 'reference', 'type', 'uri'])
        .execute();
};

exports.get = function(identity){
	
	docsets = new Docsets();
	return docsets
        .filter('docset', filters.operators.EQUALS, identity.docset)
        .filter('reference', filters.operators.EQUALS, identity.reference)
        .filter('type', filters.operators.EQUALS, identity.type)
        .select(['docset', 'reference', 'type', 'content'])
        .execute().then(function(references) {
            return references[0];
        });
}
