var cheerio = require('cheerio');
var q = require('Q');

function createRef(name, content){
	var ref = {};

	if(/Class: /.test(name)){
		ref.reference = name.match(/Class: (\w*)/)[1];
		ref.type = "class";
	}else if(/Event: /.test(name)){
		ref.reference = name.match(/Event: (\w*)/)[1];
		ref.type = "event";
	}else if(/[\w.]*\([ \w.,\[\]]*\)/.test(name)){
		ref.reference = name.match(/([\w.]*)\([ \w.,\[\]]*\)/)[1];
		ref.type = "function";
	}else if(/require\([\w;&]*\)/.test(content)){
		ref.reference = name;
		ref.type = "module";
	}else{
		ref.reference = name;
		ref.type = "documentation";
	}
	ref.content = content;
	return ref;
}

function process(html){
	var $ = cheerio.load(html);
	var references = [];
	
	$('#toc')
		.find('a')
		.each(function(index, element){
			var data = $(element);
			var content = $(data.attr('href'))
								.parents(':header')
								.nextUntil(':header');
			var ref=createRef(data.text(), $.html(content));
			references.push(ref);	
		});

	return references;
};

exports.processReference = function(html){
	return q.fcall(process, html);
}