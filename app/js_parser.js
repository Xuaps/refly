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
	
	var name = $('h1');
	var content = $('article');
	var ref=createRef(docset,name.text(), $.html(name)+content.html(), getSlashUrl(docset, $('nav.crumbs'),$));

	references.push(ref);	
	links.set(uri, ref.uri);

	return {'references':references, 'links':links};
};

function createRef(docset,name, content, uri){
	var ref = parseReference(name);

	ref.parent=null;
	ref.docset = docset;
	ref.uri = uri;
	ref.parent = getParentSlashUrl(uri);	
	ref.content = content===undefined?undefined:md(content);

	return ref;
};

function getSlashUrl(docset, data, $){
	var lis = data.find('li');
	var url='';

	for(var i=lis.length-1;$(lis[i]).text().indexOf(docset)==-1;i--){

		url = '/' + $(lis[i]).text() + url;
	}

	return '/'+docset.toLowerCase()+url.toLowerCase();
};

function getParentSlashUrl(child_url){
	var parent_url='';
	if(child_url.split('/').length>3){
		parent_url = child_url.substring(0,child_url.lastIndexOf('/'));
	}

	return parent_url;
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