var Docsets = require('../../app/docsets.js');
var request = require('../../app/slash_request.js');
var slash_parser = require('../../app/slash_parser.js');

module.exports=function(docset, base_url, toc_url){
	var docsets = new Docsets();

	request(base_url+toc_url)
		.then(slash_parser.processToc)
		.then(function(urls){
			for (var i = urls.length - 1; i >= 0; i--) {
				 request(base_url+'/'+urls[i])
				 	.then(function(html){
				 		return slash_parser.processReferences(docset,html);
				 	})
				 	.then(docsets.addRefsRange);
			};
		})
		.fail(function(error){
			throw new Error(error);
		});
};