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

            slash_parser.processReferences('Node.js v0.10.29', 'crypto.html', html).then(function(result) {
                references = result;
            });

            runs(function() {
                expect(references).toEqual([
                    {
                        docset: "Node.js v0.10.29",
                        reference: 'Crypto',
                        type: 'module',
                        content: "Stability: 2 - Unstable; API changes are being discussed for\n\
    future versions.  Breaking changes will be minimized.  See below.\n\
\n\
Use `require('crypto')` to access this module.\n\
\n\
The crypto module offers a way of encapsulating secure credentials to be\n\
used as part of a secure HTTPS net or http connection.\n\
\n\
It also offers a set of wrappers for OpenSSL's hash, hmac, cipher,\n\
decipher, sign and verify methods.",
                        uri: 'crypto.html#crypto_crypto',
                        parent: null
                    },
                    {
                        docset: "Node.js v0.10.29",
                        reference: 'Cipher',
                        type: 'class',
                        content: "Class for encrypting data.\n\
\n\
Returned by `crypto.createCipher` and `crypto.createCipheriv`.\n\
\n\
Cipher objects are [streams][0] that are both readable and\n\
writable. The written plain text data is used to produce the\n\
encrypted data on the readable side. The legacy `update` and `final`\n\
methods are also supported.\n\
\n\
\n\
[0]: stream.html",
                        uri: 'crypto.html#crypto_class_cipher',
                        parent: {docset: "Node.js v0.10.29", reference: "Crypto", type: "module"}
                    },
                    {
                        docset: "Node.js v0.10.29",
                        reference: 'cipher.update',
                        type: 'function',
                        content: "Updates the cipher with `data`, the encoding of which is given in\n\
`input_encoding` and can be `'utf8'`, `'ascii'` or `'binary'`. If no\n\
encoding is provided, then a buffer is expected.\n\
If `data` is a `Buffer` then `input_encoding` is ignored.\n\
\n\
The `output_encoding` specifies the output format of the enciphered\n\
data, and can be `'binary'`, `'base64'` or `'hex'`. If no encoding is\n\
provided, then a buffer is returned.\n\
\n\
Returns the enciphered contents, and can be called many times with new\n\
data as it is streamed.",
                        uri: 'crypto.html#crypto_cipher_update_data_input_encoding_output_encoding',
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