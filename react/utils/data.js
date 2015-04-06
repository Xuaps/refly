var jQuery = require('jquery-browserify');
var settings = require('../utils/settings.js');
var ReferenceNotFoundError = require('../errors/reference-not-found.js');

var Data = {};

Data.getDefaultDocsets = function(){
    return jQuery.ajax({
	        url:'/api/docsets?active=true',  
	        method: 'GET'
        });
};

Data.getActiveDocsets = function(){
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

Data.searchReference = function(pattern, page){
    return jQuery.ajax({
	        url: '/api/references' 
                +'?name=' + pattern
                +'&page=' + page
                + settings.getWorkingDocsets().reduce(function(prev, current){
                    return prev + '&docsets='+current.name;
                },''),
	        method: 'GET'
        });
};

Data.getReference = function(docset, uri){
    return jQuery.ajax({
        url: '/api/references/{0}/{1}'.format(docset, uri),
        method: 'GET',
        statusCode: {
            404: function(){
                throw new ReferenceNotFoundError();
            }
        }
    });
};

module.exports = Data;
