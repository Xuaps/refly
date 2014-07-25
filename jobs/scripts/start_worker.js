var jobs=require('../');
var config = require('config');
// setup a worker
var worker = require('coffee-resque').connect(config.redisConfig).worker('*', jobs);

// some global event listeners
//
// Triggered every time the Worker polls.
worker.on('poll', function(worker, queue) {});

// Triggered before a Job is attempted.
worker.on('job', function(worker, queue, job) {
	console.log('Starting job:');
	console.log(job);
});

// Triggered every time a Job errors.
worker.on('error', function(err, worker, queue, job) {
	console.log(err);
});

// Triggered on every successful Job run.
worker.on('success', function(worker, queue, job, result) {
	console.log('Success job:');
	console.log(job);
	console.log('Job result:');
	console.log(result);
});

worker.start();
