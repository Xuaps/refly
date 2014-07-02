var proxyquire = require('proxyquire');
var Docsets = require('./stubs/docsets');
var nock = require('nock');
var slash_docset = proxyquire('../bots/jobs/slash_docset.js', { '../../app/docsets.js' : Docsets });

describe('Slash a docset', function(){
	var base_url = 'http://nodejs.org/docs/latest/api';
	var toc_url = '/index.html';

	beforeEach(function() {
		Docsets.prototype._collection = [];
      	nock('http://nodejs.org')
      		.get('/docs/latest/api/index.html')
      		.replyWithFile(200, __dirname + '/html/little_index_node.html');

      	nock('http://nodejs.org')
      		.get('/docs/latest/api/documentation.html')
      		.replyWithFile(200, __dirname + '/html/crypto_node.html');

      	nock('http://nodejs.org')
      		.get('/docs/latest/api/synopsis.html')
      		.replyWithFile(200, __dirname + '/html/crypto_node.html');

      	nock('http://nodejs.org')
      		.get('/docs/latest/api/assert.html')
      		.replyWithFile(200, __dirname + '/html/crypto_node.html');
    });

	it('should process a whole docset and add it to docsets collection', function(){
		waitsFor(function(){
			return Docsets.prototype._collection.length===9;
		});

		slash_docset('Node.js v0.10.29', base_url, toc_url);

		runs(function(){
			expect(Docsets.prototype._collection.length).toEqual(9);
		});
	});	
});