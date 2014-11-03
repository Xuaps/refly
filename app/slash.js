var Docsets = require('./docsets');
var filters = require('./filters');
var q = require('q');

var search = function(options) {
    docsets = new Docsets();
    return docsets
        .filter('docset', filters.operators.IN, options.docsets)
        .filter('reference', filters.operators.CONTAINS, options.reference)
        .filter('type', filters.operators.IN, options.types)
        .select(['docset', 'reference', 'type', 'uri'])
        .execute();
};

var get = function(identity){
	docsets = new Docsets();
	return docsets
        .filter('uri', filters.operators.EQUALS, '/' + identity)
        .select(['docset', 'reference', 'type', 'content', 'uri'])
        .execute().then(function(references) {
            return references[0];
        });
}

var get_docsets = function(identity){
    docsets = new Docsets();
    return docsets.select(['docset']).execute().then(function(references){
        var unique_references = [];
        references.reduce(function(previousValue, currentValue, index, array) {
			if(unique_references.indexOf(currentValue.docset)==-1){
            	unique_references.push(currentValue.docset);
			}
		});
		return unique_references;
	});
};

var get_types = function(docset){
    docsets = new Docsets();
    return docsets.filter('docset', filters.operators.IN, docset)
		.select(['type']).execute().then(function(references){
        var unique_references = [];
        references.reduce(function(previousValue, currentValue, index, array) {
			if(unique_references.indexOf(currentValue.type)==-1){
            	unique_references.push(currentValue.type);
			}
		});
		return unique_references;
	});
}

var get_id = function(identity){
	docsets = new Docsets();
	if(identity[0]!='/'){
		identity = '/' + identity;
	}
	return docsets
        .filter('uri', filters.operators.EQUALS, identity)
        .select(['id'])
        .execute().then(function(references) {
            return (references.length > 0) ? references[0].id : null;
        });
}

var children = function(id){
	docsets = new Docsets();
	return docsets
        .filter('parent_id', filters.operators.EQUALS, id)
        .select(['docset', 'reference', 'type', 'uri'])
        .execute();
}

var branch = function(id){
	var promises = [];
	firstchildren = children(id);
	promises.push(firstchildren);
	return firstchildren.then(function(references){
		
		references.forEach(function(child){
			promises.push(get_id(child.uri).then(function(id){
			return (id!=null) ? branch(id) : [{reference: child.reference, uri: child.uri}];}));
		});
		return q.all(promises);
	});
}

var breadcrumbs = function(id){
	var promises = [];
	firstitem = get_by_id(id);
	promises.push(firstitem);
	return firstitem.then(function(ref){
			promises.push((ref.parent_id!=null) ? breadcrumbs(ref.parent_id): ref);
			return q.all(promises);
	});
}

var get_by_id = function(id){
	docsets = new Docsets();
	return docsets
        .filter('id', filters.operators.EQUALS, id)
        .select(['docset', 'reference', 'type', 'content', 'uri', 'parent_id'])
        .execute().then(function(references) {
            return (references.length > 0) ? references[0].id : null;
        });
}

module.exports.children = children;
module.exports.branch = branch;
module.exports.breadcrumbs = breadcrumbs;
module.exports.get_id = get_id;
module.exports.get_types = get_types;
module.exports.get_docsets = get_docsets;
module.exports.get = get;
module.exports.search = search;
