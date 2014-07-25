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
				 		return slash_parser.processReferences(docset, url, html);
				 	}));
			});
			return q.all(promises);
		})
		.then(function(arg){
			var references = arg.reduce(function(previousValue, currentValue, index, array){
			  return previousValue.concat(currentValue.references);
			},[]);
			var links = arg.reduce(function(previousValue, currentValue, index, array){
				debugger;
			  for(property in currentValue.links){
			  	previousValue[property] = currentValue.links[property];
			  }
			  return previousValue;
			},{});

			return slash_parser.processContentLinks(references, links);
		})
		.then(function(references){
			return docsets.addRefsRange(references).execute();
		})
		.then(callback)
		.fail(function(error){
			throw new Error(error);
		});
};