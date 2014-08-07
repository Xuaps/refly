var nock = require('nock');
var fs = require('fs');
var slash_parser = require('../app/js_parser');

describe('slash_parser',function(){
    describe('processReference', function(){
        it('should get a references collection from html', function(done){
            var references = null;
            var html = fs.readFileSync(__dirname+'/html/math_cos_javascript.html', 'utf-8');
            var md = fs.readFileSync(__dirname+'/html/math_cos_javascript.md', 'utf-8');

            slash_parser.processReferences('JavaScript', 
                '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos',html)
            .then(function(result) {
                link = result.links[0];
                reference = result.references[0];
                expect(reference.docset).toEqual("JavaScript");
                //resolve name
                expect(reference.reference).toEqual('Math.cosh()');
                //resolve type
                expect(reference.type).toEqual('function');
                //resolve url
                expect(reference.uri).toEqual('/javascript/standard built-in objects/math/math.cosh()');
                //resolve parent url
                expect(reference.parent).toEqual('/javascript/standard built-in objects/math');
                //return urls matching
                expect(result.links.keys()[0]).toEqual('/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos');
                expect(result.links.values()[0]).toEqual('/javascript/standard built-in objects/math/math.cosh()');

                done();
            })
            .fail(function(error){
                done(error);
            });
        });

        xit('should return all posible types', function(){
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
    });
});