var jQuery = require('jquery-browserify');
var local = require('store2');

var Data = {};

Data.getDefaultDocsets = function(){
    return jQuery.ajax({
	        url:'/api/docsets?active=true',  
	        method: 'GET'
        });
};

Data.getTypes = function(docset){
    return jQuery.ajax({
	        url:'/api/types?docset='+docset,
	        method: 'GET'
	    });
};

Data.getReferences = function(docset, type, page){
    return jQuery.ajax({
	        url: '/api/references?docsets={0}&types={1}&page={2}'.format(docset, type, page),
	        method: 'GET'
	    });
};

Data.getWorkingDocsets = function(){
    return local.get(WK_DOCSETS);
};

Data.setWorkingDocsets = function(docsets){
    local.set(WK_DOCSETS, docsets);
};

module.exports = Data;
