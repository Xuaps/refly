var Docsets = require('../app/docsets.js');
var request = require('../app/slash_request.js');
var slash_parser = require('../app/slash_parser.js');

module.exports=function(docset, base_url, toc_url, callback){
	var docsets = new Docsets();

	request(base_url+toc_url)
		.then(slash_parser.processToc)
		.then(function(urls){
			urls.forEach(function(url){
				 request(base_url+'/'+url)
				 	.then(function(html){
				 		return slash_parser.processReferences(docset,html);
				 	})
				 	.then(
				 		function(refs){
				 			docsets.addRefsRange(refs).then(function(){})
				 		});
				 	
			});
		})
		.then(callback)
		.fail(function(error){
			throw new Error(error);
		});
};