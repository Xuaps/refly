var Docsets = require('../app/docsets.js');
var request = require('../app/slash_request.js');
var slash_parser = require('../app/slash_parser.js');
var q = require('q');

module.exports=function(docset, base_url, toc_url, callback){
	var docsets = new Docsets();

	request(base_url+toc_url)
		.then(slash_parser.processToc)
		.then(function(urls){
			var promises = [];
			urls.forEach(function(url){
				promises.push(
				 request(base_url+'/'+url)
				 	.then(function(html){
				 		return slash_parser.processReferences(docset,url,html);
				 	})
				 	.then(function(refs){
			 			return docsets.addRefsRange(refs).execute();
			 		}));
			});
			return q.all(promises);
		})
		.then(callback)
		.fail(function(error){
			throw new Error(error);
		});
};