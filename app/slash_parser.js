var cheerio = require('cheerio');
var q = require('Q');

function createRef(docset,name, content, parent){
	var ref = {'docset': docset};

	if(/Class: /.test(name)){
		ref.reference = name.match(/Class: (\w*)/)[1];
		ref.type = "class";
	}else if(/Event: /.test(name)){
		ref.reference = name.match(/Event: (\w*)/)[1];
		ref.type = "event";
	}else if(/[\w.]*\([ \w.,\[\]]*\)/.test(name)){
		ref.reference = name.match(/([\w.]*)\([ \w.,\[\]]*\)/)[1];
		ref.type = "function";
	}else{ 
		ref.type = "module";
		ref.reference = name.match(/(\w*)/)[1];
	}

	ref.content = content;
	ref.parent = parent;

	return ref;
}

function getParent(docset,data){
	var tag = data['0'].name;
	var tag_parent = 'h'+(tag[1]-1);
	var prev = data.prev();

	while(prev.length>0){
		if(prev.first()['0'].name===tag_parent)
			return createRef(docset,prev.text());
		prev = prev.prev();
	}
	return null;
}

function process(html, docset){
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

exports.processReference = function(docset, html){

	return q.fcall(process, html, docset);
}