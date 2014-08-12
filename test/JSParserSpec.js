var nock = require('nock');
var fs = require('fs');
var slash_parser = require('../app/js_parser');

describe('slash_parser',function(){
    describe('processReference', function(){
        it('should get a references collection from html', function(done){
            var references = null;
            var html = fs.readFileSync(__dirname+'/html/math_cos_javascript.html', 'utf-8');

            slash_parser.processReferences('JavaScript', 
                '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos',html)
            .then(function(result) {
                link = result.links[0];
                reference = result.references[0];
                expect(reference.docset).toEqual("JavaScript");
                //resolve name
                expect(reference.reference).toEqual('Math.cosh()');
                //resolve type
                expect(reference.type).toEqual('method');
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

        it('should get a empty collection if html is not well formatted', function(done){
            var references = null;
            var html = '<html></html>';

            slash_parser.processReferences('JavaScript', 
                '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos',html)
            .then(function(result) {
                expect(result.references.length).toEqual(0);

                done();
            })
            .fail(function(error){
                done(error);
            });
        });

        describe("resolve types", function(){
            it('should return methods', function(done){
                var html = fs.readFileSync(__dirname+'/html/math_cos_javascript.html', 'utf-8');

                slash_parser.processReferences('JavaScript', 
                    '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos',html)
                .then(function(result) {
                    reference = result.references[0];
                    expect(reference.type).toEqual('method');

                    done();
                })
                .fail(function(error){
                    done(error);
                });
            });

            it('should return properties', function(done){
                var html = fs.readFileSync(__dirname+'/html/math_e_javascript.html', 'utf-8');

                slash_parser.processReferences('JavaScript', 
                    '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/E',html)
                .then(function(result) {
                    reference = result.references[0];
                    expect(reference.type).toEqual('property');

                    done();
                })
                .fail(function(error){
                    done(error);
                });
            });

            it('should return classes', function(done){
             var html = fs.readFileSync(__dirname+'/html/math_javascript.html', 'utf-8');

                slash_parser.processReferences('JavaScript', 
                    '/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math',html)
                .then(function(result) {
                    reference = result.references[0];
                    expect(reference.type).toEqual('class');

                    done();
                })
                .fail(function(error){
                    done(error);
                });
            });

            it('should return objects', function(done){
                var html = fs.readFileSync(__dirname+'/html/undefined_javascript.html', 'utf-8');

                slash_parser.processReferences('JavaScript', 
                    '/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined',html)
                .then(function(result) {
                    reference = result.references[0];
                    expect(reference.type).toEqual('object');

                    done();
                })
                .fail(function(error){
                    done(error);
                });
            });

            it('should return functions', function(done){
                var html = fs.readFileSync(__dirname+'/html/decodeURI_javascript.html', 'utf-8');

                slash_parser.processReferences('JavaScript', 
                    '/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent',html)
                .then(function(result) {
                    reference = result.references[0];
                    expect(reference.type).toEqual('function');

                    done();
                })
                .fail(function(error){
                    done(error);
                });
            });

            it('should return statements', function(done){
                var html = fs.readFileSync(__dirname+'/html/block_javascript.html', 'utf-8');

                slash_parser.processReferences('JavaScript', 
                    '/en-US/docs/Web/JavaScript/Reference/Statements/block',html)
                .then(function(result) {
                    reference = result.references[0];
                    expect(reference.type).toEqual('statement');

                    done();
                })
                .fail(function(error){
                    done(error);
                });
            });

            it('should return expressions', function(done){
                var html = fs.readFileSync(__dirname+'/html/this_javascript.html', 'utf-8');

                slash_parser.processReferences('JavaScript', 
                    '/en-US/docs/Web/JavaScript/Reference/Operators/this',html)
                .then(function(result) {
                    reference = result.references[0];
                    expect(reference.type).toEqual('expression');

                    done();
                })
                .fail(function(error){
                    done(error);
                }); 
            });

            xit('should return documentations', function(done){
             
            });
        });
    });
});