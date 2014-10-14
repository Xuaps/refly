var jQuery = require('jquery-browserify');

function Api(){
    this._url_docset='/api/docsets';
    this._url_types='/api/types';
    this._url_references='/api/references';
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
    }else{
         return jQuery.ajax({
            url:this._url_references +'?docsets='+filters.docset+'&types='+filters.type,
            method: 'GET'
        });

    }
};

module.exports = new Api();
