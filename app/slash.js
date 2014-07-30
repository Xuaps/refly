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
        .filter('uri', filters.operators.EQUALS, '/' + identity)
        .select(['docset', 'reference', 'type', 'content', 'uri'])
        .execute().then(function(references) {
            return references[0];
        });
}

exports.get_id = function(identity){
	docsets = new Docsets();
	return docsets
        .filter('uri', filters.operators.EQUALS, '/' + identity)
        .select(['id'])
        .execute().then(function(references) {
            return (references.length > 0) ? references[0].id : null;
        });
}

exports.children = function(id){
	docsets = new Docsets();
	return docsets
        .filter('parent_id', filters.operators.EQUALS, id)
        .select(['docset', 'reference', 'type', 'uri'])
        .execute();
}
