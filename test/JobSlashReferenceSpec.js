var proxyquire = require('proxyquire');
var Docsets = require('./stubs/docsets');

var slash_reference = proxyquire('../bots/jobs/slash_reference', 
	{ '../../app/docsets' : Docsets });

describe('Job: slash_reference', function(){
	it('', function(){
		Docsets.prototype._collection=[];

		slash_reference('http://nodejs.org/docs/latest/api/', 'nodejs v0.10.29');

		expect(Docsets.prototype._collection).toContain({
                    reference: 'search',
                    type: 'function',
                    docset: 'node',
                    content: 'blablabla'
                });
	})
})