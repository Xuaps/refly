var jQuery = require('jquery-browserify');

function Api(){
    this._url_docset='/api/docsets';
    this._url_types='/api/types';
    this._url_references='/api/references';
    this._url_parent='/api/reference/';
    this._url_reference='/api/reference/';
    this._url_branch='/api/referencesbranch';
}

Api.prototype._addUris = function(ref){
	if(!ref)
		return ref;
    var pos = ref.uri.indexOf('/', 1);
    ref.docset = ref.uri.substring(1,pos);
    ref.ref_uri = ref.uri.substring(pos+1,ref.uri.length);

    return ref;
};

Api.prototype._addUrisToReferences= function(references){
    if(!references || references==undefined)
        return references;

    return references.map(this._addUris);
};

Api.prototype.get = function (resource, filters){
    if(resource==='docset'){
        return jQuery.ajax({
            url: this._url_docset,
            method: 'GET'
        });
    }else if(resource==='type'){
        return jQuery.ajax({
            url:this._url_types +'?docset='+filters.docset,
            method: 'GET'
        });
    }else if(resource==='parent'){
		var uri_parts = filters.uri.split('/').slice(0, -1);
		var uri = uri_parts.join('/');
        return jQuery.ajax({
            url: this._url_parent + uri,
            method: 'GET'
        }).then(this._addUris);
    }else if(resource==='reference'){
        return jQuery.ajax({
            url: this._url_reference + filters.docset + '/' + filters.uri,
            method: 'GET'
        }).then(this._addUris);
    }else if(resource==='branch'){
		uri = filters.uri;
		if(filters.uri.indexOf('/')>0)
			uri = '/' + filters.uri;
        return jQuery.ajax({
            url: this._url_branch + uri,
            method: 'GET'
        }).then(this._addUrisToReferences.bind(this));
    }else if(resource==='search'){
        return jQuery.ajax({
            url: this._url_references + '?reference=' + filters.searchtext,
            method: 'GET'
        }).then(this._addUrisToReferences.bind(this));
    }else{
         return jQuery.ajax({
            url:this._url_references +'?docsets='+filters.docset+'&types='+filters.type,
            method: 'GET'
        }).then(this._addUrisToReferences.bind(this));
    }
};

module.exports = new Api();
