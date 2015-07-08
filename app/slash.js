var References = require('./references');
var Docsets = require('./docsets');
var filters = require('./filters');
var Users = require('./users');
var q = require('q');

var search = function(options) {
    if((options.page && !options.pagesize) || (options.pagesize && !options.page))
       throw Error('page and pagesize must be given');

    var query = _build_base_query(options);

    if(options.page)
        query = query.page(options.page, options.pagesize);
    
    return query.select(['docset', 'reference', 'type', 'uri']).count('total').execute()
        .then(function(results){
        return {
            total: results.length>0?results[0].total:0,
            items: results
        };
      });
};

var _build_base_query = function(options){
    var query = new References();

    query = options.docsets?query.filter('docset', filters.operators.IN, options.docsets):query;
    query = options.name?query.filter('reference', filters.operators.CONTAINS, options.name):query;
    query = options.types?query.filter('type', filters.operators.IN, options.types):query;
    return query.docsetstatefilter(true);
};

var get = function(uri){
	if(uri[0]!='/'){
		uri = '/' + uri;
	}
	references = new References();
	return references
        .filter('uri', filters.operators.EQUALS, uri)
        .select(['docset', 'reference', 'type', 'content', 'content_anchor', 'uri', 'parent_uri'])
        .docsetstatefilter(true)
        .execute().then(function(references) {
            return references[0];
        });
};

var get_types = function(docset){
    references = new References();
    return references.filter('docset', filters.operators.IN, docset)
		.select(['type']).execute().then(function(references){
        var unique_references = [];
        if(references.length>0){
            references.reduce(function(previousValue, currentValue, index, array) {
                if(previousValue.indexOf(currentValue.type)===-1){
                    previousValue.push(currentValue.type);
                }
                return previousValue;
            }, unique_references);
        }
		return unique_references;
	});
};

var _children = function(uri){
	references = new References();
	return references
        .filter('parent_uri', filters.operators.EQUALS, uri)
        .select(['docset', 'reference', 'type', 'uri'])
        .execute();
};

var branch = function(uri, level,branch_collection){
	var branchlist = branch_collection || [];
	var currentlevel = level;
	return get(uri).then(function(ref){
		if(ref===undefined)
			return [];
		branchchildren = _children(ref.uri);
		return branchchildren.then(function(references){
			branchlist.push(references);
			if(ref.parent_uri !== null && currentlevel>0){
				return branch(ref.parent_uri, currentlevel-1,branchlist);
			}else{
				return branchlist;
			}

		});
	});
};

var breadcrumbs = function(uri, breadcrumb_collection){
	var breadcrumb = breadcrumb_collection || [];
	
	return get(uri).then(function(ref){
		if(ref===undefined){
			return [];
		}
		breadcrumb.unshift(ref);
		if(ref.parent_uri !== null && breadcrumb.length<3)
			return breadcrumbs(ref.parent_uri, breadcrumb);
		return breadcrumb;
	});
};

var get_docset = function(name){
	docsets = new Docsets();
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return docsets
        .filter('docset', filters.operators.START_WITH, name)
        .execute().then(function(docsets){
            return (docsets.length > 0) ? docsets[0] : null;   
        });
};

var get_docsets = function(active){
    docsets = new Docsets();
    if(active){
        docsets.filter('active', filters.operators.EQUALS, active);
    }
    return docsets
        .select(['docset','default_uri', 'update_date', 'label', 'active']).order('update_date', 'ASC')
        .execute();
};

var get_docsetsbyuser = function(token){
    docsets = new Docsets();
    return new Users().find({auth_token: token}).then(function(users){
        return docsets
        .select(['docsets.docset','docsets.default_uri', 'docsets.update_date', 'docsets.label', 'docsets.active']).docsetsbyuser(users[0].id).execute();
    })
};
var savedocsetxuser = function(token, docsetstring){
    var docsetlist = docsetstring.split(',');
    return new Users().find({auth_token: token}).then(function(users){
        docsets = new Docsets();
        return docsets.savedocsetxuser(users[0].id, docsetlist);
    });

}
module.exports.branch = branch;
module.exports.breadcrumbs = breadcrumbs;
module.exports.get_types = get_types;
module.exports.get_docset = get_docset;
module.exports.get_docsets = get_docsets;
module.exports.get_docsetsbyuser = get_docsetsbyuser;
module.exports.savedocsetxuser = savedocsetxuser;
module.exports.get = get;
module.exports.search = search;
