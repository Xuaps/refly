var fs = require('fs');
var slash_parser = require('../app/slash_parser');

describe('slash_parser',function(){
    
	it('should get a references collection from html', function(){
		var references = null;
		var html = fs.readFileSync(__dirname+'/html/crypto_node.html', 'utf-8');

        waitsFor(function() {
            return references != null;
        });

        slash_parser.processReference('Node.js v0.10.29', html).then(function(result) {
            references = result;
        });

        runs(function() {
            expect(references).toEqual([
            	{
            		docset: "Node.js v0.10.29",
            		reference: 'Crypto',
            		type: 'module',
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
</p>',
					parent: null
            	},
            	{
            		docset: "Node.js v0.10.29",
            		reference: 'Cipher',
            		type: 'class',
            		content: '<p>Class for encrypting data.\n\
\n\
</p><p>Returned by <code>crypto.createCipher</code> and <code>crypto.createCipheriv</code>.\n\
\n\
</p><p>Cipher objects are <a href="stream.html">streams</a> that are both readable and\n\
writable.  The written plain text data is used to produce the\n\
encrypted data on the readable side.  The legacy <code>update</code> and <code>final</code>\n\
methods are also supported.\n\
\n\
</p>',
					parent: {docset: "Node.js v0.10.29", reference: "Crypto", type: "module"}
            	},
            	{
            		docset: "Node.js v0.10.29",
            		reference: 'cipher.update',
            		type: 'function',
            		content: '<p>Updates the cipher with <code>data</code>, the encoding of which is given in\n\
<code>input_encoding</code> and can be <code>&apos;utf8&apos;</code>, <code>&apos;ascii&apos;</code> or <code>&apos;binary&apos;</code>.  If no\n\
encoding is provided, then a buffer is expected.\n\
If <code>data</code> is a <code>Buffer</code> then <code>input_encoding</code> is ignored.\n\
\n\
</p><p>The <code>output_encoding</code> specifies the output format of the enciphered\n\
data, and can be <code>&apos;binary&apos;</code>, <code>&apos;base64&apos;</code> or <code>&apos;hex&apos;</code>.  If no encoding is\n\
provided, then a buffer is returned.\n\
\n\
</p><p>Returns the enciphered contents, and can be called many times with new\n\
data as it is streamed.\n\
\n\
</p>',
					parent: {docset: "Node.js v0.10.29", reference: "Cipher", type: "class"}
            	}
            ]);
        });
	})

	xit('should get a references collection from html', function(){
		var references = null;
		var html = fs.readFileSync(__dirname+'/html/crypto_node.html', 'utf-8');

        waitsFor(function() {
            return references != null;
        });

        slash_parser.processReference(html).then(function(result) {
            references = result;
        });

        runs(function() {
            expect(references).toEqual([
            	{
            		reference: 'Crypto',
            		type: 'module',
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
            	},
            	{
            		reference: 'crypto.getCiphers',
            		type: 'function',
            		content: '<p>Returns an array with the names of the supported ciphers.\n\
\n\
</p><p>Example:\n\
\n\
</p><pre><code>var ciphers = crypto.getCiphers();\n\
console.log(ciphers); // [&apos;AES-128-CBC&apos;, &apos;AES-128-CBC-HMAC-SHA1&apos;, ...]</code></pre>'
            	},
            	{
            		reference: 'crypto.getHashes',
            		type: 'function',
            		content: '<p>Returns an array with the names of the supported hash algorithms.\n\
\n\
</p><p>Example:\n\
\n\
</p><pre><code>var hashes = crypto.getHashes();\n\
console.log(hashes); // [&apos;sha&apos;, &apos;sha1&apos;, &apos;sha1WithRSAEncryption&apos;, ...]</code></pre>'
            	},
            	{
            		reference: 'Cipher',
            		type: 'class',
            		content: '<p>Class for encrypting data.\n\
\n\
</p><p>Returned by <code>crypto.createCipher</code> and <code>crypto.createCipheriv</code>.\n\
\n\
</p><p>Cipher objects are <a href="stream.html">streams</a> that are both readable and\n\
writable.  The written plain text data is used to produce the\n\
encrypted data on the readable side.  The legacy <code>update</code> and <code>final</code>\n\
methods are also supported.\n\
\n\
</p>'
            	},
            	{
            		reference: 'cipher.update',
            		type: 'function',
            		content: '<p>Updates the cipher with <code>data</code>, the encoding of which is given in\n\
<code>input_encoding</code> and can be <code>&apos;utf8&apos;</code>, <code>&apos;ascii&apos;</code> or <code>&apos;binary&apos;</code>.  If no\n\
encoding is provided, then a buffer is expected.\n\
If <code>data</code> is a <code>Buffer</code> then <code>input_encoding</code> is ignored.\n\
\n\
</p><p>The <code>output_encoding</code> specifies the output format of the enciphered\n\
data, and can be <code>&apos;binary&apos;</code>, <code>&apos;base64&apos;</code> or <code>&apos;hex&apos;</code>.  If no encoding is\n\
provided, then a buffer is returned.\n\
\n\
</p><p>Returns the enciphered contents, and can be called many times with new\n\
data as it is streamed.\n\
\n\
</p>'
            	}
            ]);
        });
	})
})