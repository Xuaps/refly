var settings = require('../infrastructure/settings.js');
var authentication = require('../infrastructure/authentication.js');
var ReferenceNotFoundError = require('../errors/reference-not-found.js');
var PaymentRequiredError = require('../errors/payment-required.js');
var AuthenticationError = require('../errors/authentication-required.js');
var Q = require('q');

var Data = {};

Data.getDefaultDocsets = function(){
    return $.ajax({
	        url:'/api/docsets?active=true',  
	        method: 'GET'
        });
};

Data.getUserDocsets = function(user){
    var token = authentication.getAuth();
    return $.ajax({
            url: '/api/settings/{0}'.format(user),  
            method: 'GET',
            headers: {
                authorization: 'Bearer {0}'.format(token)
            },
            statusCode: {
                401: function(){
                    deferred.reject(new AuthenticationError());
                },
                400: function(){
                    deferred.reject(new AuthenticationError());
                }
            }
            });
};

Data.setUserDocsets = function(docsets){
    var token = authentication.getAuth();
    return $.ajax({
            url:'/api/settings/set'
            + '?docsets=' + docsets.join(','),
            method: 'GET',
            headers: {
                authorization: 'Bearer {0}'.format(token)
            },
            statusCode: {
                401: function(){
                    deferred.reject(new AuthenticationError());
                }
            }
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
            402: function(){
                deferred.reject(new PaymentRequiredError());
            },
            404: function(){
                deferred.reject(new ReferenceNotFoundError());
            }
        }
    }).then(deferred.resolve);

    return deferred.promise;
};

Data.getCurrentUser = function(){
    var deferred = Q.defer();
    var token = authentication.getAuth();
    $.ajax({
        url: '/api/users/current',
        method: 'GET',
        headers: {
            authorization: 'Bearer {0}'.format(token)
        },
        statusCode: {
            401: function(){
                deferred.reject(new AuthenticationError());
            }
        }
    }).then(deferred.resolve);

    return deferred.promise;
};

Data.deleteSession = function(){
    var deferred = Q.defer();
    var token = authentication.getAuth();
    $.ajax({
        url: '/api/session',
        method: 'DELETE',
        headers: {
            authorization: 'Bearer {0}'.format(token)
        },
        statusCode: {
            401: function(){
                deferred.reject(new AuthenticationError());
            }
        }
    }).then(deferred.resolve);

    return deferred.promise;
};

module.exports = Data;
