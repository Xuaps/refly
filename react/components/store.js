var jQuery = require('jquery-browserify');
var settings = require('../utils/settings.js');

function Api(){
    this._url_docset_active='/api/docsets?active=true';
    this._url_docset_all='/api/docsets';
    this._url_types='/api/types';
    this._url_references='/api/references';
    this._url_branch='/api/references/{0}/c&b';
	this._url_breadcrumbs = '/api/references/{0}/hierarchy';
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
    var references = res['_embedded']['rl:references']?res['_embedded']['rl:references']:res['_embedded']['rl:hierarchy'];
    if(!references)
        return references;

    return references.map(this._addUris);
};

Api.prototype.get = function (resource, filters){
	if(resource==='docset_active'){
	    return jQuery.ajax({
	        url: this._url_docset_active,
	        method: 'GET'
	    }).then(function(res){
            return res['_embedded']['rl:docsets'];   
        });
	}if(resource==='docset_all'){
	    return jQuery.ajax({
	        url: this._url_docset_all,
	        method: 'GET'
	    }).then(function(res){
            return res['_embedded']['rl:docsets'];   
        });
	}else if(resource==='type'){
	    return jQuery.ajax({
	        url:this._url_types +'?docset='+filters.activedocset,
	        method: 'GET'
	    }).then(function(response){ return response['_embedded']['rl:types']; });
	}else if(resource==='reference'){
	    return jQuery.ajax({
	        url: this._url_references + '/' + filters.docset + '/' + filters.uri,
	        method: 'GET'
	    }).then(this._addUris);
	}else if(resource==='branch'){
	    return jQuery.ajax({
	        url: this._url_branch.format(filters.uri),
	        method: 'GET'
	    }).then(this._addUrisToReferences.bind(this));
	}else if(resource==='breadcrumbs'){
        return jQuery.ajax({
            context: this,
	        url: this._url_breadcrumbs.format(filters.uri),
	        method: 'GET'
	    }).then(this._addUrisToReferences.bind(this));
	}else if(resource==='search'){
	    return jQuery.ajax({
	        url: this._url_references 
                +'?name=' + filters.searchtext
                +'&page=' + filters.page
                + settings.getWorkingDocsets().reduce(function(prev, current){
                    return prev + '&docsets='+current.name;
                },''),
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
