var jQuery = require('jquery-browserify');
var settings = require('../utils/settings.js');

function Api(){
    this._url_docset_all='/api/docsets';
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
	if(resource==='docset_all'){
	    return jQuery.ajax({
	        url: this._url_docset_all,
	        method: 'GET'
	    }).then(function(res){
            return res['_embedded']['rl:docsets'];   
        });
	}else if(resource==='breadcrumbs'){
        return jQuery.ajax({
            context: this,
	        url: this._url_breadcrumbs.format(filters.uri),
	        method: 'GET'
	    }).then(this._addUrisToReferences.bind(this));
	}
};

module.exports = new Api();
