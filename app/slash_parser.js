var cheerio = require('cheerio');
var q = require('q');
var md = require('html-md');

exports.processReferences = function(docset, html){
	return q.fcall(processReferences, html, docset);
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

function processReferences(html, docset){
	var $ = cheerio.load(html);
	var references = [];
	var parent = null;
	
	$('#apicontent')
		.find(':header')
		.each(function(index, element){
			var data = $(element);
			var content = data.nextUntil(':header');
			var ref=createRef(docset,data.text(), $.html(content), getParent(docset,data));
			references.push(ref);	
		});

	return references;
};

function createRef(docset,name, content, parent){
	var ref = {'docset': docset};

	if(/Class: /.test(name)){
		ref.reference = name.match(/Class: '{0,1}(\w*)'{0,1}/)[1];
		ref.type = "class";
	}else if(/Event: /.test(name)){
		ref.reference = name.match(/Event: '{0,1}(\w*)'{0,1}/)[1];
		ref.type = "event";
	}else if(/[\w.]*\([ \w.,\[\]]*\)/.test(name)){
		ref.reference = name.match(/([\w.]*)\([ \w.,\[\]]*\)/)[1];
		ref.type = "function";
	}else{ 
		ref.type = "module";
		ref.reference = name.match(/(\w*)/)[1];
	}

	ref.content = content===undefined?undefined:md(content);
	ref.parent = parent;

	return ref;
};

function getParent(docset,data){
	var tag = data['0'].name;
	var tag_parent = 'h'+(tag[1]-1);
	var prev = data.prevAll().filter(tag_parent);

	if(prev.length>0){
		return createRef(docset,prev.first().text());
	}

	return null;
};