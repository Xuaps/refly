var fs = require('fs');
var slash_parser = require('../app/slash_parser');

describe('slash_parser',function(){
	it('should get a reference from html', function(){
		var references = null;
		var html = fs.readFileSync(__dirname+'/html/crypto_node.html', 'utf-8');

        waitsFor(function() {
            return references != null;
        });

        slash_parser(html).then(function(result) {
            references = result;
        });

        runs(function() {
            expect(references).toEqual([
            	{
            		reference: 'Crypto',
            		type: 'class',
            		content: '<pre class="api_stability_2">Stability: 2 - Unstable; API changes are being discussed for\n\
future versions.  Breaking changes will be minimized.  See below.</pre><p>Use <code>require(&apos;crypto&apos;)</code> to access this module.\n\
\n\
</p><p>The crypto module offers a way of encapsulating secure credentials to be\n\
used as part of a secure HTTPS net or http connection.\n\
\n\
</p><p>It also offers a set of wrappers for OpenSSL&apos;s hash, hmac, cipher,\n\
decipher, sign and verify methods.\n\
\n\
\n\
</p>'
            	}
            ]);
        });
	})

	xit('should get a references collection from html', function(){
		var references = null;
		var html = fs.readFile(__dirname+'html/index_node.html', function(error){});

        waitsFor(function() {
            return references != null;
        });

        slash_parser(html).then(function(result) {
            references = result;
        });

        runs(function() {
            expect(references).toEqual([
            	{},
            	{},
            	{},
            	{}
            ]);
        });
	})
})