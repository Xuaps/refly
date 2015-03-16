var jQuery = require('jquery-browserify');

var Proxy = function(){};

Proxy.getDefaultDocsets = function(){
    return jQuery.ajax({
	        url:'/api/docsets?active=true',  
	        method: 'GET'
        });
};

Proxy.getTypes = function(docset){
    return jQuery.ajax({
	        url:'/api/types?docset='+docset,
	        method: 'GET'
	    });
};

Proxy.getReferences = function(docset, type, page){
    return jQuery.ajax({
	        url: '/api/references?docsets={0}&types={1}&page={2}'.format(docset, type, page),
	        method: 'GET'
	    });
};

module.exports = Proxy;
