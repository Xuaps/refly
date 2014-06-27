var jobs=require('./jobs.js');
// setup a worker
var worker = require('coffee-resque').connect({
  host: '127.0.0.1',
  port: '6379'
}).worker('*', jobs)

// some global event listeners
//
// Triggered every time the Worker polls.
worker.on('poll', function(worker, queue) {})

// Triggered before a Job is attempted.
worker.on('job', function(worker, queue, job) {})

// Triggered every time a Job errors.
worker.on('error', function(err, worker, queue, job) {})

// Triggered on every successful Job run.
worker.on('success', function(worker, queue, job, result) {})

worker.start()