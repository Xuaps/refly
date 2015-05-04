var settings = require('../utils/settings.js');
var ReferenceNotFoundError = require('../errors/reference-not-found.js');
var Q = require('q');

var Data = {};

Data.getDefaultDocsets = function(){
    return $.ajax({
	        url:'/api/docsets?active=true',  
	        method: 'GET'
        });
};

Data.getActiveDocsets = function(){
    return $.ajax({
	        url:'/api/docsets?active=true',  
	        method: 'GET'
        });
};

Data.getTypes = function(docset){
    return $.ajax({
	        url:'/api/types?docset='+docset,
	        method: 'GET'
	    });
};

Data.getReferences = function(docset, type, page){
    return $.ajax({
	        url: '/api/references?docsets={0}&types={1}&page={2}'.format(docset, type, page),
	        method: 'GET'
	    });
};

Data.searchReference = function(pattern, page){
    return $.ajax({
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
    var deferred = Q.defer();
    $.ajax({
        url: '/api/references/{0}/{1}'.format(docset, uri),
        method: 'GET',
        statusCode: {
            404: function(){
                deferred.reject(new ReferenceNotFoundError());
            }
        }
    }).then(deferred.resolve);

    return deferred.promise;
};

module.exports = Data;
