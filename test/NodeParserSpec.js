var nock = require('nock');
var fs = require('fs');
var slash_parser = require('../app/node_parser');

describe('node_parser',function(){
    describe('processReference', function(){
        describe('generate reference name', function(){
            it('should get a complete name for modules', function(done){

                slash_parser.processReferences('juas', 'juas.html',
                    '<div id="apicontent">\
                        <h1>File Modules<span><a class="mark" href="#tty_tty" id="tty_tty">#</a></span></h1>\
                        <pre class="api_stability_2">Stability: 2 - Unstable</pre>\
                    </div>').then(function(res){
                        expect(res.references[0].reference).toEqual('File Modules');
                        done();
                    });
            });

            it('should get a complete name for class with dots', function(done){

                slash_parser.processReferences('juas', 'juas.html',
                    '<div id="apicontent">\
                        <h1>Class: fs.WriteStream<span><a class="mark" href="#tty_tty" id="tty_tty">#</a></span></h1>\
                        <pre class="api_stability_2">Stability: 2 - Unstable</pre>\
                    </div>').then(function(res){
                        expect(res.references[0].reference).toEqual('fs.WriteStream');
                        done();
                    });
            });

            it('should get a complete name for functions', function(done){

                slash_parser.processReferences('juas', 'juas.html',
                    '<div id="apicontent">\
                        <h1>new Buffer(array)<span><a class="mark" href="#tty_tty" id="tty_tty">#</a></span></h1>\
                        <pre class="api_stability_2">Stability: 2 - Unstable</pre>\
                    </div>').then(function(res){
                        expect(res.references[0].reference).toEqual('new Buffer(array)');
                        done();
                    });
            });

            it('should get a complete name for a property', function(done){

                slash_parser.processReferences('juas', 'juas.html',
                    '<div id="apicontent">\
                        <h1>buffer.INSPECT_MAX_BYTES<span><a class="mark" href="#tty_tty" id="tty_tty">#</a></span></h1>\
                        <pre class="api_stability_2">Stability: 2 - Unstable</pre>\
                    </div>').then(function(res){
                        expect(res.references[0].reference).toEqual('buffer.INSPECT_MAX_BYTES');
                        expect(res.references[0].type).toEqual('property');
                        done();
                    });
            });

            it('should get a complete name for a property -  another example', function(done){

                slash_parser.processReferences('juas', 'juas.html',
                    '<div id="apicontent">\
                        <h1>http.IncomingMessage<span><a class="mark" href="#tty_tty" id="tty_tty">#</a></span></h1>\
                        <pre class="api_stability_2">Stability: 2 - Unstable</pre>\
                    </div>').then(function(res){
                        expect(res.references[0].reference).toEqual('http.IncomingMessage');
                        expect(res.references[0].type).toEqual('property');
                        done();
                    });
            });
        });

        it('should get a links collection from html', function(done){
            var html = fs.readFileSync(__dirname+'/html/crypto_node.html', 'utf-8');

            slash_parser.processReferences('Node.js v0.10.29', 'crypto_node.html', html).then(function(result){
                expect(result.links.get('#crypto_class_cipher')).toEqual('/node.js v0.10.29/crypto/cipher');
                expect(result.links.get('crypto_node.html#crypto_class_cipher')).toEqual('/node.js v0.10.29/crypto/cipher');
                expect(result.links.get('crypto_node.html')).toEqual('/node.js v0.10.29/crypto');
                done();
            });
        });

        it('should get a references collection from html', function(){
            var references = null;
            var html = fs.readFileSync(__dirname+'/html/crypto_node.html', 'utf-8');

            waitsFor(function() {
                return references != null;
            });

            slash_parser.processReferences('Node.js v0.10.29', 'crypto_node.html',html).then(function(result) {
                references = result.references;
            });

            runs(function() {
                expect(references.length).toEqual(3);
            });
        });

        it('should return all posible types', function(){
            var references = null;
            var html = fs.readFileSync(__dirname+'/html/tty_node.html', 'utf-8');

            waitsFor(function() {
                return references != null;
            });

            slash_parser.processReferences('Node.js v0.10.29', 'tty_node.html', html).then(function(result) {
                references = result.references;
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

            slash_parser.processReferences('Node.js v0.10.29', 'tty_node.html', html).then(function(result) {
                references = result.references;
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

            slash_parser.processReferences('Node.js v0.10.29', 'tty_node.html', html).then(function(result) {
                references = result.references;
            });

            runs(function() {
                expect(references.length).toEqual(10);
                expect(references[0].parent).toEqual('');
                expect(references[2].parent).toEqual('/node.js v0.10.29/tty');
                expect(references[5].parent).toEqual('/node.js v0.10.29/tty/readstream');
                expect(references[6].parent).toEqual('/node.js v0.10.29/tty');
                expect(references[8].parent).toEqual('/node.js v0.10.29/tty/writestream');
            });
        });
    });
});