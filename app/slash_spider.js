var q = require('q');
var cheerio = require('cheerio');
var request = require('./slash_request');
var Map = require('hashmap').HashMap;

exports.run = function(domain, path, selector){
	var visited = new Map();
	var to_visit = [];

	to_visit.push(path);
	
	return process_url(domain,selector,to_visit,visited);
};


function process_url(domain, selector, to_visit, visited){
	var path=to_visit.shift();
	return request(domain+path)
		.then(function(body){
			visited.set(path, body);	
			var $ = cheerio.load(body);

			$('body').find('a')
			.each(function(index, element){
				var new_path = $(element).attr('href');
				if(selector.test(new_path) 
					&& !visited.has(new_path) 
					&& to_visit.indexOf(new_path)==-1){
					to_visit.push(new_path);
				}
			});
			if(to_visit.length==0)
				return visited;

			return process_url(domain, selector, to_visit, visited);
		});	
}
