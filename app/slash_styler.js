var q = require('q');

exports.processContentLinks = function(references, links){
	return q.fcall(processContentLinks, references, links);
}

function processContentLinks(references, links){
	references.map(function(ref){
		var myRegex = /\[\d*\]: (.*)/g;
		var match = myRegex.exec(ref.content);
		while(match!=null){
			if(links.has(match[1]))
				ref.content = ref.content.replace(match[1], encodeURI(links.get(match[1])));

			match = myRegex.exec(ref.content);
		}
	});

	return references;
}