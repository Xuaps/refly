var jQuery = require('jquery-browserify');

function Api(){
    this._url_docset_active='/api/docsets?kind=active';
    this._url_docset_all='/api/docsets?kind=all';
    this._url_types='/api/types';
    this._url_references='/api/references';
    this._url_branch='/api/referencesbranch';
	this._url_breadcrumbs = '/api/referencesbreadcrumbs';
}

Api.prototype._addUris = function(ref){
	if(!ref)
		return ref;
	if(ref.uri==undefined){
		return undefined;
	}
    var pos = ref.uri.indexOf('/', 1);
    ref.docset = ref.uri.substring(1,pos);
    ref.ref_uri = ref.uri.substring(pos+1,ref.uri.length);

    return ref;
};

Api.prototype._addUrisToReferences= function(res){
    var references = res['_embedded']?res['_embedded'].references:res;
    if(!references)
        return references;

    return references.map(this._addUris);
};

Api.prototype.get = function (resource, filters){
	if(resource==='docset_active'){
	    return jQuery.ajax({
	        url: this._url_docset_active,
	        method: 'GET'
	    });
	}if(resource==='docset_all'){
	    return jQuery.ajax({
	        url: this._url_docset_all,
	        method: 'GET'
	    });
	}else if(resource==='type'){
	    return jQuery.ajax({
	        url:this._url_types +'?docset='+filters.activedocset,
	        method: 'GET'
	    });
	}else if(resource==='reference'){
	    return jQuery.ajax({
	        url: this._url_references + '/' + filters.docset + '/' + filters.uri,
	        method: 'GET'
	    }).then(this._addUris);
	}else if(resource==='branch'){
		uri = filters.uri;
		if(uri.indexOf('/')>0)
			uri = '/' + filters.uri;
	    return jQuery.ajax({
	        url: this._url_branch + uri,
	        method: 'GET'
	    }).then(this._addUrisToReferences.bind(this));
	}else if(resource==='breadcrumbs'){
		uri = filters.uri;
		if(uri.indexOf('/')>0)
			uri = '/' + filters.uri;
	    return jQuery.ajax({
	        url: this._url_breadcrumbs + uri,
	        method: 'GET'
	    }).then(this._addUrisToReferences.bind(this));
	}else if(resource==='search'){
	    return jQuery.ajax({
	        url: this._url_references +'?' + filters.searchtext,
	        method: 'GET'
	    }).then(this._addUrisToReferences.bind(this));
	}else if(resource==='treeviewreference'){
	     return jQuery.ajax({
	        url:this._url_references +'?docsets='+filters.docset+'&types='+filters.type,
	        method: 'GET'
	    }).then(this._addUrisToReferences.bind(this));
	}
};

module.exports = new Api();
