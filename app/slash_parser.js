var cheerio = require('cheerio');
var q = require('Q');

function resolveType(reference, content){

	if(/Class: /.test(reference)){
		return "class";
	}else if(/Event: /.test(reference)){
		return "event";
	}else if(/[\w.]*\([\w.,\[\]]*\)/.test(reference)){
		return "function";
	}else if(/require\([\w;&]*\)/.test(content)){
		return "module";
	}else{
		return "documentation";
	}
	// class, evenet, function
}

function process(html){
	var $ = cheerio.load(html);
	var references = [];
	
	$('#toc')
		.find('a')
		.each(function(index, element){
			var data = $(element);
			var ref={reference:data.text()};

			ref.content=$.html($(data.attr('href'))
				.parents(':header')
				.nextUntil(':header'));
			ref.type=resolveType(ref.reference, ref.content);

			references.push(ref);	
		});

	return references;
};

exports.processReference = function(html){
	return q.fcall(process, html);
}