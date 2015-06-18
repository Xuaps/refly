var settings = require('../infrastructure/settings.js');
var authentication = require('../infrastructure/authentication.js');
var ReferenceNotFoundError = require('../errors/reference-not-found.js');
var PaymentRequiredError = require('../errors/payment-required.js');
var AuthenticationError = require('../errors/authentication-required.js');
var Q = require('q');

var Data = {};
var statusCodeHandlers = function(deferred){
    return  {
                400: function(err){
                    deferred.reject(err.responseJSON);
                },
                401: function(){
                    deferred.reject(new AuthenticationError());
                },
                402: function(){
                    deferred.reject(new PaymentRequiredError());
                },
                404: function(){
                    deferred.reject(new ReferenceNotFoundError());
                },
                500: function(err){
                    deferred.reject(err.responseJSON);
                },
            };
};

var getHeaders = function(){
    var token = authentication.getAuth();
    return {
        authorization: token?'Bearer {0}'.format(token):''
    };
};
   
Data.getDefaultDocsets = function(){
    return $.ajax({
	        url:'/api/docsets?active=true',  
	        method: 'GET',
            headers: getHeaders(),
        });
};

Data.getUserDocsets = function(user){
    var token = authentication.getAuth();
    return $.ajax({
            url: '/api/settings',
            method: 'GET',
            headers: getHeaders(),
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
            url:'/api/settings?'
            + 'docsets=' + docsets.join(','),
            method: 'PUT',
            headers: getHeaders(),
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
	        method: 'GET',
            headers: getHeaders(),
        });
};

Data.getTypes = function(docset){
    return $.ajax({
	        url:'/api/types?docset='+docset,
	        method: 'GET',
            headers: getHeaders(),
	    });
};

Data.getReferences = function(docset, type, page){
    return $.ajax({
	        url: '/api/references?docsets={0}&types={1}&page={2}'.format(docset, type, page),
	        method: 'GET',
            headers: getHeaders()
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
	        method: 'GET',
            headers: getHeaders()
        });
};

Data.getReference = function(docset, uri){
    var deferred = Q.defer();
    $.ajax({
        url: '/api/references/{0}/{1}'.format(docset, uri),
        method: 'GET',
        statusCode: statusCodeHandlers(deferred),
        headers: getHeaders()
    }).then(deferred.resolve);

    return deferred.promise;
};

Data.getCurrentUser = function(){
    var deferred = Q.defer();
    var token = authentication.getAuth();
    $.ajax({
        url: '/api/users/current',
        method: 'GET',
        headers: getHeaders(),
        statusCode: statusCodeHandlers(deferred)
    }).then(deferred.resolve);

    return deferred.promise;
};

Data.deleteSession = function(){
    var deferred = Q.defer();
    var token = authentication.getAuth();
    $.ajax({
        url: '/api/session',
        method: 'DELETE',
        headers: getHeaders(),
        statusCode: statusCodeHandlers(deferred)
    }).then(deferred.resolve);

    return deferred.promise;
};

Data.getSubscription = function(){
    var deferred = Q.defer();
    var token = authentication.getAuth();
    $.ajax({
        url: '/api/subscriptions/current',
        method: 'GET',
        headers: getHeaders(),
        statusCode: statusCodeHandlers(deferred)
    }).then(deferred.resolve);

    return deferred.promise;
};

Data.cancelSubscription = function(){
    var deferred = Q.defer();
    var token = authentication.getAuth();
    $.ajax({
        url: '/api/subscriptions/current',
        method: 'DELETE',
        headers: getHeaders(),
        statusCode: statusCodeHandlers(deferred)
    }).then(deferred.resolve);

    return deferred.promise;
};

Data.createSubscription = function(card_token, plan){
    var deferred = Q.defer();
    var token = authentication.getAuth();
    $.ajax({
        url: '/api/subscriptions/form',
        method: 'PUT',
        headers: getHeaders(),
        data: JSON.stringify({ "token": card_token, "plan": plan }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        statusCode: statusCodeHandlers(deferred)
    }).then(deferred.resolve);

    return deferred.promise;
};
module.exports = Data;
