var cheerio = require('cheerio');
var q = require('Q');

function process(html){
	var $ = cheerio.load(html);
	var references = [];
	
	$('#toc')
		.find('a')
		.each(function(index, element){
			var data = $(element);
			var ref={reference:data.text(), type: 'class'};

			ref.content=$.html($(data.attr('href'))
				.parents(':header')
				.nextUntil(':header'));
			
			references.push(ref);	
		});

	return references;
};

module.exports = function(html){
	return q.fcall(process, html);
}