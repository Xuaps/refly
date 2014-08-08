var config = require('config');
var resque = require('coffee-resque').connect(config.redisConfig);

var parser = process.argv[2] || 'node';


if(parser==='node'){

	resque.enqueue('docsets', 'slash_docset', ['Node.js v0.10.29', 'http://nodejs.org/docs/latest/api/', 'index.html', "^(?!all|\/).*(\.html){1}$", 'node_parser'], function(err, remainingJobs) {
	  console.log('New job '+ parser +' queued. Remaining jobs in queue: ' + remainingJobs);
	});

}else if(parser==='js'){
	resque.enqueue('docsets', 'slash_docset', ['JavaScript', 'https://developer.mozilla.org', '/en-US/docs/Web/JavaScript/Reference', "^\/en-US\/docs\/Web\/JavaScript\/Reference((?!\\$|#).)*$", 'js_parser'], function(err, remainingJobs) {
	  console.log('New job '+ parser +' queued. Remaining jobs in queue: ' + remainingJobs);
	});
}