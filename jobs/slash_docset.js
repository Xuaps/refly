var q = require('q');
var config = require('config')
var njstrace = require('njstrace').inject(config.njstrace);

var Docsets = require('../app/docsets.js');
var request = require('../app/slash_request.js');
var spider = require('../app/slash_spider.js');
var styler = require('../app/slash_styler.js');

module.exports=function(docset, domain, start_page, selector, parser, callback){
	var parser = require('../app/'+parser);
	var docsets = new Docsets();

	spider.run(domain, start_page, new RegExp(selector))
	.then(function(urls){
		var promises = [];
		urls.forEach(function(html, url){
			promises.push(parser.processReferences(docset, url, html));
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
		callback(error);
	});
};