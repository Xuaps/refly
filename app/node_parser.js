var cheerio = require('cheerio');
var q = require('q');
var md = require('html-md');
var Map = require('hashmap').HashMap;

var Reference = require('./reference');

exports.processReferences = function(docset, url, html){
	return q.fcall(processReferences, docset, url, html);
}

function processReferences(docset,uri,html){
	var $ = cheerio.load(html);
	var references = [];
	var links = new Map();
	var parent = null;

	$('#apicontent')
		.find(':header')
		.each(function(index, element){
			var data = $(element);
			var content = data.nextUntil(':header');
			var type = resolveType(data.text());
			var name = parseName(type, data.text());
			var ref=new Reference(docset,name, type, $.html(data)+$.html(content), getSlashUrl(docset,data, $));
			references.push(ref);	
			links.set(data.find('a').first().attr('href'), ref.uri);
			links.set(uri+data.find('a').first().attr('href'),ref.uri);
			if(ref.parent === ''){
				links.set(uri, ref.uri);
			}
		});
		
	return {'references':references, 'links':links};
};

function getSlashUrl(docset, data, $){
	var url='/'+parseName(resolveType(data.text()), data.text());
	for(var prev = data.prevAll().filter(calculateParentTag(data)); 
			prev.length>0;prev=prev.prevAll().filter(calculateParentTag(prev))){
		
		url='/'+parseName(resolveType(prev.text()), prev.text())+url;
	}

	return '/'+docset.toLowerCase()+url.toLowerCase();
};

function resolveType(name, uri, $){
	if(/Class: /.test(name)){
		return "class";
	}else if(/Event: /.test(name)){
		return "event";
	}else if(/[\w.|(new )]*\([ \w.,\[\]]*\)/.test(name)){
		return  "function";
	}else if(/([\w]+\.[a-zA-Z_]+)/.test(name)){
		return "property";
	}
	
	return 'module';
}

function calculateParentTag(data){
	var tag = data['0'].name;
	return tag_parent = 'h'+(tag[1]-1);
};

function parseName(type, name){
	switch(type){
		case 'class':
			return name.match(/Class: '{0,1}([\w\.]*)'{0,1}/)[1];
		case 'event':
			return name.match(/Event: '{0,1}([\w\.]*)'{0,1}/)[1];
		case 'function':
			return name.match(/([\w.|(new )]*\([ \w.,\[\]]*\))/)[1];
		case 'property':
			return name.match(/([\w]+\.[a-zA-Z_]+)/)[1];
		default:
			return name.match(/([\w ]*)/)[1];
	}
};