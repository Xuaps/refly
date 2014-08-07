var proxyquire = require('proxyquire');
var Docsets = require('./stubs/docsets');
var nock = require('nock');
var slash_docset = proxyquire('../jobs/slash_docset.js', { '../app/docsets.js' : Docsets });

describe('Slash a docset', function(){
	var domain = 'http://nodejs.org/docs/latest/api/';
	var start_page = 'index.html';

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
      	nock('http://nodejs.org')
      		.get('/docs/latest/api/stream.html')
      		.replyWithFile(200, __dirname + '/html/crypto_node.html');
    });

	it('should process a whole docset and add it to docsets collection', function(done){
		slash_docset('Node.js v0.10.29', domain, start_page, "^(?!all|\/).*(\.html){1}$", function(results){
			expect(Docsets.prototype._collection.length).toEqual(12);
                  expect(Docsets.prototype._collection[0].docset).toEqual('Node.js v0.10.29')
                  expect(Docsets.prototype._collection[0].reference).toEqual('Crypto')
                  expect(Docsets.prototype._collection[0].type).toEqual('module')
                  expect(Docsets.prototype._collection[0].parent).toBeNull();
                  expect(Docsets.prototype._collection[0].content).not.toContain('[0]: #crypto_class_cipher');
                  expect(Docsets.prototype._collection[0].content).toContain('[0]: /node.js%20v0.10.29/crypto');

			done();
		});
	});	
});