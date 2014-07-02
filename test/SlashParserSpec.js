var nock = require('nock');
var fs = require('fs');
var slash_parser = require('../app/slash_parser');

describe('slash_parser',function(){
    describe('processReference', function(){
        it('should get a references collection from html', function(){
            var references = null;
            var html = fs.readFileSync(__dirname+'/html/crypto_node.html', 'utf-8');

            waitsFor(function() {
                return references != null;
            });

            slash_parser.processReferences('Node.js v0.10.29', html).then(function(result) {
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
        });

        it('should return all posible types', function(){
            var references = null;
            var html = fs.readFileSync(__dirname+'/html/tty_node.html', 'utf-8');

            waitsFor(function() {
                return references != null;
            });

            slash_parser.processReferences('Node.js v0.10.29', html).then(function(result) {
                references = result;
            });

            runs(function() {
                expect(references.length).toEqual(10);
                expect(references[0].type).toEqual('module');
                expect(references[2].type).toEqual('function');
                expect(references[6].type).toEqual('class');
                expect(references[9].type).toEqual('event');
            });
        });

        it('should return refrence name well-formatted', function(){
            var references = null;
            var html = fs.readFileSync(__dirname+'/html/tty_node.html', 'utf-8');

            waitsFor(function() {
                return references != null;
            });

            slash_parser.processReferences('Node.js v0.10.29', html).then(function(result) {
                references = result;
            });

            runs(function() {
                expect(references.length).toEqual(10);
                expect(references[9].reference).toEqual('resize');
            });
        });



        it('should return a more complex parents hierarchy', function(){
            var references = null;
            var html = fs.readFileSync(__dirname+'/html/tty_node.html', 'utf-8');

            waitsFor(function() {
                return references != null;
            });

            slash_parser.processReferences('Node.js v0.10.29', html).then(function(result) {
                references = result;
            });

            runs(function() {
                expect(references.length).toEqual(10);
                expect(references[0].parent).toBeNull();
                expect(references[2].parent).toEqual({docset:'Node.js v0.10.29', reference:'TTY', type:'module'});
                expect(references[5].parent).toEqual({docset:'Node.js v0.10.29', reference:'ReadStream', type:'class'});
                expect(references[6].parent).toEqual({docset:'Node.js v0.10.29', reference:'TTY', type:'module'});
                expect(references[8].parent).toEqual({docset:'Node.js v0.10.29', reference:'WriteStream', type:'class'});
            });
        });
    });
    
    describe('processToc', function(){
        it('should return a collection of urls', function(){
            var urls = null;
            var html = fs.readFileSync(__dirname+'/html/index_node.html', 'utf-8');

            waitsFor(function() {
                return urls != null;
            });

            slash_parser.processToc(html).then(function(result) {
                urls = result;
            });

            runs(function() {
                expect(urls.length).toEqual(36);
                expect(urls[3]).toEqual('buffer.html');
                expect(urls[35]).toEqual('zlib.html');
            });
        });
    });
});