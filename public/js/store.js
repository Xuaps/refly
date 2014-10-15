var jQuery = require('jquery-browserify');

function Api(){
    this._url_docset='/api/docsets';
    this._url_types='/api/types';
    this._url_references='/api/references';
    this._url_parent='/api/reference/';
    this._url_branch='/api/referencesbranch';
}

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
        });
    }else if(resource==='branch'){
        return jQuery.ajax({
            url: this._url_branch + filters.uri,
            method: 'GET'
        });
    }else{
         return jQuery.ajax({
            url:this._url_references +'?docsets='+filters.docset+'&types='+filters.type,
            method: 'GET'
        });

    }
};

module.exports = new Api();
