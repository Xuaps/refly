var cheerio = require('cheerio');
var q = require('q');
var md = require('html-md');
var Map = require('hashmap').HashMap;

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
			var ref=createRef(docset,data.text(), $.html(data)+$.html(content), getUrl(docset,data));
			references.push(ref);	
			links.set(data.find('a').first().attr('href'), ref.uri);
			links.set(uri+data.find('a').first().attr('href'),ref.uri);
			if(ref.parent === null){
				links.set(uri, ref.uri);
			}
		});
		
	return {'references':references, 'links':links};
};

function getUrl(docset, data){
	var url='/'+parseReference(data.text()).reference;
	for(var prev = data.prevAll().filter(calculateParentTag(data)); 
			prev.length>0;prev=prev.prevAll().filter(calculateParentTag(prev))){
		
		url='/'+parseReference(prev.text()).reference+url;
	}

	return '/'+docset.toLowerCase()+url.toLowerCase();
};

function calculateParentTag(data){
	var tag = data['0'].name;
	return tag_parent = 'h'+(tag[1]-1);
};

function createRef(docset,name, content, uri){
	var ref = parseReference(name);

	ref.parent=null;
	ref.docset = docset;
	ref.uri = uri;
	if(uri.split('/').length>3){
		ref.parent = uri.substring(0,uri.lastIndexOf('/'));
	}
	ref.content = content===undefined?undefined:md(content);

	return ref;
};

function parseReference(name){
	var ref = {};

	if(/Class: /.test(name)){
		ref.reference = name.match(/Class: '{0,1}([\w\.]*)'{0,1}/)[1];
		ref.type = "class";
	}else if(/Event: /.test(name)){
		ref.reference = name.match(/Event: '{0,1}([\w\.]*)'{0,1}/)[1];
		ref.type = "event";
	}else if(/[\w.|(new )]*\([ \w.,\[\]]*\)/.test(name)){
		ref.reference = name.match(/([\w.|(new )]*\([ \w.,\[\]]*\))/)[1];
		ref.type = "function";
	}else if(/([\w]+\.[a-zA-Z_]+)/.test(name)){
		ref.reference = name.match(/([\w]+\.[a-zA-Z_]+)/)[1];
		ref.type = "property";
	}else{ 
		ref.type = "module";
		ref.reference = name.match(/([\w ]*)/)[1];
	}

	return ref;
}