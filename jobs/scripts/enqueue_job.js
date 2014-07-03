var resque = require('coffee-resque').connect({
  host: '127.0.0.1',
  port: '6379'
});
resque.enqueue('docsets', 'slash_docset', ['Node.js v0.10.29', 'http://nodejs.org/docs/latest/api', '/index.html'], function(err, remainingJobs) {
  console.log('New job queued. Remaining jobs in queue: ' + remainingJobs);
});