var cheerio = require('cheerio');
var q = require('q');
var md = require('html-md');

exports.processReferences = function(docset, url, html){
	return q.fcall(processReferences, docset, url, html);
}

exports.processToc = function(html){
	return q.fcall(processToc, html);
};

function processToc(html){
	var $ = cheerio.load(html);
	var urls = [];
	
	$('#apicontent')
		.find('a')
		.each(function(index, element){
			var data = $(element);
			urls.push(data.attr('href'));	
		});

	return urls;
};

function processReferences(docset,url,html){
	var $ = cheerio.load(html);
	var references = [];
	var parent = null;
	
	$('#apicontent')
		.find(':header')
		.each(function(index, element){
			var data = $(element);
			var content = data.nextUntil(':header');
			var ref=createRef(docset,data.text(), $.html(data)+$.html(content), getParentUrl(data));
			references.push(ref);	
		});

	return references;
};

function getParentUrl(data){
	var url='';
	for(var prev = data.prevAll().filter(calculateParentTag(data)); 
			prev.length>0;prev=prev.prevAll().filter(calculateParentTag(prev))){
		
		url='/'+parseReference(prev.text()).reference+url;
	}

	return url.toLowerCase();
};

function calculateParentTag(data){
	var tag = data['0'].name;
	return tag_parent = 'h'+(tag[1]-1);
};

function createRef(docset,name, content, parent){
	var ref = parseReference(name);

	ref.docset = docset;
	ref.parent = parent==''? null : docset.toLowerCase() + parent;
	ref.uri = (ref.parent || docset.toLowerCase()) + '/' + ref.reference.toLowerCase();
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
	}else if(/([\w]+\.[A-Z_]+)/.test(name)){
		ref.reference = name.match(/([\w]+\.[A-Z_]+)/)[1];
		ref.type = "property";
	}else{ 
		ref.type = "module";
		ref.reference = name.match(/([\w ]*)/)[1];
	}

	return ref;
}