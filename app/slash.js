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

exports.get_docsets = function(){
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
}

exports.get_types = function(docset){
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

exports.branch = function(id){
	list = [];
	docsets = new Docsets();
	docsets
        .filter('parent_id', filters.operators.EQUALS, id)
        .select(['docset', 'reference', 'type', 'uri'])
        .execute();
	list.concat(docsets);
	if(docsets.length>0){
		for(ref in docsets){
			slash.get_id(ref.uri).then(function(id) {
				if (id == null) {
				    res.send([]);
				} else {
				    slash.branch(id).then(function(references) {
				        res.send(references);
				    });
				}
			});
		}
	}
	return list;
}
