var config = require('config');
var resque = require('coffee-resque').connect(config.redisConfig);

resque.enqueue('docsets', 'slash_docset', ['Node.js v0.10.29', 'http://nodejs.org/docs/latest/api', '/index.html'], function(err, remainingJobs) {
  console.log('New job queued. Remaining jobs in queue: ' + remainingJobs);
});