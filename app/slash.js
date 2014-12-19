var References = require('./references');
var Docsets = require('./docsets');
var filters = require('./filters');
var q = require('q');

var search = function(options) {
    references = new References();
    //TODO: remove if when types are implemented
    if(typeof(options) != 'string'){
        return references
            .filter('docset', filters.operators.IN, options.docsets)
            .filter('reference', filters.operators.CONTAINS, options.reference)
            .filter('type', filters.operators.IN, options.types)
            .select(['docset', 'reference', 'type', 'uri'])
            .execute();
    }else{
        return references
            .filter('reference', filters.operators.CONTAINS, options)
            .execute();
    }
};

var get = function(uri){
	if(uri[0]!='/'){
		uri = '/' + uri;
	}
	references = new References();
	return references
        .filter('uri', filters.operators.EQUALS, uri)
        .select(['docset', 'reference', 'type', 'content', 'uri', 'parent_uri'])
        .execute().then(function(references) {
            return references[0];
        });
}
// DEPRECATED DEPENDE DEL TEST
var get_docsets = function(identity){
    references = new References();
    return references.select(['docset']).execute().then(function(references){
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
    references = new References();
    return references.filter('docset', filters.operators.IN, docset)
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
	references = new References();
	if(identity[0]!='/'){
		identity = '/' + identity;
	}
	return references
        .filter('uri', filters.operators.EQUALS, identity)
        .select(['id'])
        .execute().then(function(references) {
            return (references.length > 0) ? references[0].id : null;
        });
}

var children = function(uri){
	references = new References();
	return references
        .filter('parent_uri', filters.operators.EQUALS, uri)
        .select(['docset', 'reference', 'type', 'uri'])
        .execute();
}

var branch = function(uri, level,branch_collection){
	var branchlist = branch_collection || [];
	var currentlevel = level;
	return get(uri).then(function(ref){
		if(ref==undefined)
			return [];
		branchchildren = children(ref.uri)
		return branchchildren.then(function(references){
			branchlist.push(references);
			if(ref.parent_uri != null && currentlevel>0){
				return branch(ref.parent_uri, currentlevel-1,branchlist);
			}else{
				return branchlist;
			}

		});
	});
}

var breadcrumbs = function(uri, breadcrumb_collection){
	var breadcrumb = breadcrumb_collection || [];
	
	return get(uri).then(function(ref){
		if(ref==undefined){
			return [];
		}
		breadcrumb.unshift(ref);
		if(ref.parent_uri != null && breadcrumb.length<=2)
			return breadcrumbs(ref.parent_uri, breadcrumb);
		return breadcrumb;
	});
}


var get_by_id = function(id){
	references = new References();
	return references
        .filter('id', filters.operators.EQUALS, uri)
        .select(['docset', 'reference', 'type', 'uri', 'parent_uri'])
        .execute().then(function(references) {
            return (references.length > 0) ? references[0] : null;
        });
}

//Docsets

var get_docsetsbydate = function(options){
	docsets = new Docsets();
	if(options.state=='active'){
		var states = ['new','active']
		docsets.filter('state', filters.operators.IN, states)
	}
	return docsets
        .select(['docset','default_uri', 'update_date', 'state']).order('update_date', 'ASC')
        .execute();
}

module.exports.children = children;
module.exports.branch = branch;
module.exports.breadcrumbs = breadcrumbs;
module.exports.get_id = get_id;
module.exports.get_types = get_types;
module.exports.get_docsets = get_docsets;
module.exports.get_docsetsbydate = get_docsetsbydate;
module.exports.get = get;
module.exports.search = search;
