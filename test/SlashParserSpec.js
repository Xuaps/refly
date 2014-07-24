var nock = require('nock');
var fs = require('fs');
var slash_parser = require('../app/slash_parser');

describe('slash_parser',function(){
    describe('processReference', function(){
        describe('generate reference name', function(){
            it('should get a complete name for modules', function(done){

                slash_parser.processReferences('juas', 'juas.html', 
                    '<div id="apicontent">\
                        <h1>File Modules<span><a class="mark" href="#tty_tty" id="tty_tty">#</a></span></h1>\
                        <pre class="api_stability_2">Stability: 2 - Unstable</pre>\
                    </div>').then(function(refs){
                        expect(refs[0].reference).toEqual('File Modules');
                        done();
                    });
            });

            it('should get a complete name for class with dots', function(done){

                slash_parser.processReferences('juas', 'juas.html', 
                    '<div id="apicontent">\
                        <h1>Class: fs.WriteStream<span><a class="mark" href="#tty_tty" id="tty_tty">#</a></span></h1>\
                        <pre class="api_stability_2">Stability: 2 - Unstable</pre>\
                    </div>').then(function(refs){
                        expect(refs[0].reference).toEqual('fs.WriteStream');
                        done();
                    });
            });

            it('should get a complete name for functions', function(done){

                slash_parser.processReferences('juas', 'juas.html', 
                    '<div id="apicontent">\
                        <h1>new Buffer(array)<span><a class="mark" href="#tty_tty" id="tty_tty">#</a></span></h1>\
                        <pre class="api_stability_2">Stability: 2 - Unstable</pre>\
                    </div>').then(function(refs){
                        expect(refs[0].reference).toEqual('new Buffer(array)');
                        done();
                    });
            });

            it('should get a complete name for a property', function(done){

                slash_parser.processReferences('juas', 'juas.html', 
                    '<div id="apicontent">\
                        <h1>buffer.INSPECT_MAX_BYTES<span><a class="mark" href="#tty_tty" id="tty_tty">#</a></span></h1>\
                        <pre class="api_stability_2">Stability: 2 - Unstable</pre>\
                    </div>').then(function(refs){
                        expect(refs[0].reference).toEqual('buffer.INSPECT_MAX_BYTES');
                        expect(refs[0].type).toEqual('property');
                        done();
                    });
            });
        });

        it('should get a references collection from html', function(){
            var references = null;
            var html = fs.readFileSync(__dirname+'/html/crypto_node.html', 'utf-8');

            waitsFor(function() {
                return references != null;
            });

            slash_parser.processReferences('Node.js v0.10.29', 'crypto.html', html).then(function(result) {
                references = result;
            });

            runs(function() {
                expect(references).toEqual([
                    {
                        docset: "Node.js v0.10.29",
                        reference: 'Crypto',
                        type: 'module',
                        content: "# Crypto[\\#][0]\n    \n    Stability: 2 - Unstable; API changes are being discussed for\n\
    future versions.  Breaking changes will be minimized.  See below.\n\
\n\
Use `require('crypto')` to access this module.\n\
\n\
The crypto module offers a way of encapsulating secure credentials to be\n\
used as part of a secure HTTPS net or http connection.\n\
\n\
It also offers a set of wrappers for OpenSSL's hash, hmac, cipher,\n\
decipher, sign and verify methods.\n\n\n[0]: #crypto_crypto",
                        uri: 'crypto.html#crypto_crypto',
                        parent: null
                    },
                        {
                            docset: "Node.js v0.10.29",
                            reference: 'Cipher',
                            type: 'class',
                            content: "## Class: Cipher[\\#][0]\n\nClass for encrypting data.\n\
\n\
Returned by `crypto.createCipher` and `crypto.createCipheriv`.\n\
\n\
Cipher objects are [streams][1] that are both readable and\n\
writable. The written plain text data is used to produce the\n\
encrypted data on the readable side. The legacy `update` and `final`\n\
methods are also supported.\n\
\n\
\n\
[0]: #crypto_class_cipher\n\
[1]: stream.html",
                            uri: 'crypto.html#crypto_class_cipher',
                            parent: 'crypto.html#crypto_crypto'
                        },
                    {
                        docset: "Node.js v0.10.29",
                        reference: 'cipher.update(data, [input_encoding], [output_encoding])',
                        type: 'function',
                        content: "### cipher.update(data, \\[input\\_encoding\\], \\[output\\_encoding\\])[\\#][0]\n\nUpdates the cipher with `data`, the encoding of which is given in\n\
`input_encoding` and can be `'utf8'`, `'ascii'` or `'binary'`. If no\n\
encoding is provided, then a buffer is expected.\n\
If `data` is a `Buffer` then `input_encoding` is ignored.\n\
\n\
The `output_encoding` specifies the output format of the enciphered\n\
data, and can be `'binary'`, `'base64'` or `'hex'`. If no encoding is\n\
provided, then a buffer is returned.\n\
\n\
Returns the enciphered contents, and can be called many times with new\n\
data as it is streamed.\n\n\n[0]: #crypto_cipher_update_data_input_encoding_output_encoding",
                        uri: 'crypto.html#crypto_cipher_update_data_input_encoding_output_encoding',
                        parent: 'crypto.html#crypto_class_cipher'
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

            slash_parser.processReferences('Node.js v0.10.29', 'crypto.html', html).then(function(result) {
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

            slash_parser.processReferences('Node.js v0.10.29', 'crypto.html', html).then(function(result) {
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

            slash_parser.processReferences('Node.js v0.10.29','crypto.html', html).then(function(result) {
                references = result;
            });

            runs(function() {
                expect(references.length).toEqual(10);
                expect(references[0].parent).toBeNull();
                expect(references[2].parent).toEqual('crypto.html#tty_tty');
                expect(references[5].parent).toEqual('crypto.html#tty_class_readstream');
                expect(references[6].parent).toEqual('crypto.html#tty_tty');
                expect(references[8].parent).toEqual('crypto.html#tty_class_writestream');
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