var q = require('Q');
var request = require('request');

module.exports=function(url){
	var r = q.defer();

	request(url, function(error, response, body){
		if(!error){
			r.resolve(body);
		}else{
			r.reject(new Error(error));
		}
	});

	return r.promise;
};