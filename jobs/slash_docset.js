var Docsets = require('../app/docsets.js');
var request = require('../app/slash_request.js');
var slash_parser = require('../app/slash_parser.js');
var spider = require('../app/slash_spider.js');
var styler = require('../app/slash_styler.js');

var q = require('q');

module.exports=function(docset, domain, start_page, selector, callback){
	var docsets = new Docsets();

	spider.run(domain, start_page, new RegExp(selector))
	.then(function(urls){
		var promises = [];
		urls.forEach(function(html, url){
			promises.push(slash_parser.processReferences(docset, url, html));
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
		return styler.processContentLinks(references, links);
	})
	.then(function(references){
		return docsets.addRefsRange(references).execute();
	})
	.then(callback)
	.fail(function(error){
		throw new Error(error);
	});
};