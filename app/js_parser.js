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
	var name = $('h1');
	var content = $('article');
	var type =  resolveType(name.text(), uri, $);
	if(name.length>0 && content.length>0){
		var ref=new Reference(docset,name.text(), type, $.html(name)+content.html(), getSlashUrl(docset, $('nav.crumbs'),$));

		references.push(ref);	
		links.set(uri, ref.uri);
	}else{
		console.log(uri+" not processed");
	}
	return {'references':references, 'links':links};
};

function getSlashUrl(docset, data, $){
	var lis = data.find('li');
	var url='';

	for(var i=lis.length-1;i>-1 && $(lis[i]).text().indexOf(docset)==-1;i--){

		url = '/' + $(lis[i]).text() + url;
	}
	if(i<0){
		console.log(url+" malformed");
	}

	return '/'+docset.toLowerCase()+url.toLowerCase();
};

function resolveType(name, uri, $){

	if(/^.*Statements\/((?!\/).)*$/.test(uri)){
		return 'statement';
	}else if(/^.*Operators\/((?!\/).)*$/.test(uri)){
		return 'expression';
	}else if(/^.*Global_Objects\/.*(?=\/).*$/.test(uri) && /^.*(?=\)$)/.test(name)){
		return 'method';
	}else if(/^.*Global_Objects\/.*(?=\/).*$/.test(uri) && /^((?!\().)*$/.test(name)){
		return 'property';
	}else if(/^.*Global_Objects\/((?!\/).)*$/.test(uri)&& /^[A-Z]((?!\().)*$/.test(name)){
		return 'class';
	}else if(/^.*Global_Objects\/((?!\/).)*$/.test(uri) && /^.*(?=\)$)/.test(name)){
		return 'function';
	}else if(/^.*Global_Objects\/((?!\/).)*$/.test(uri) && /^[a-z]((?!\().)*$/.test(name)){
		return 'object';
	}
	
	return undefined;
};