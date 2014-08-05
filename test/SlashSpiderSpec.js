var nock = require('nock');
var spider = require('../app/slash_spider');
var fs = require('fs');

describe('slash_spider', function(){
    describe('run', function(){
        var url_A = '/docset/reference/children/A.html';
        var url_B = '/docset/aaa/reference/children/B.html';
        var url_C = '/docset/bbbb/reference/children/C.html';
        var url_D = '/docset/reference/children/D.html';
        var file_A = '/html/A.html';
        var file_B = '/html/B.html';
        var file_C = '/html/C.html';
        var file_D = '/html/D.html'

        beforeEach(function(){
            nock('http://refly.co/')
                .get(url_A)
                .replyWithFile(200, __dirname + file_A);

            nock('http://refly.co/')
                .get(url_B)
                .replyWithFile(200, __dirname + file_B);

            nock('http://refly.co/')
                .get(url_C)
                .replyWithFile(200, __dirname + file_C);

            nock('http://refly.co/')
                .get(url_D)
                .replyWithFile(200, __dirname + file_D);
        });

        it('should return a map with all urls from base url and their html content', function(done){
            var domain = 'http://refly.co';
            var A = fs.readFileSync(__dirname+file_A, 'utf-8');
            var B = fs.readFileSync(__dirname+file_B, 'utf-8');
            var C = fs.readFileSync(__dirname+file_C, 'utf-8');
            var D = fs.readFileSync(__dirname+file_D, 'utf-8');

            spider.run(domain, url_A, /\/reference\/children\//).then(function(urls) {
                expect(urls.count()).toEqual(4);
                expect(urls.get(url_A)).toEqual(A);
                expect(urls.get(url_B)).toEqual(B);
                expect(urls.get(url_C)).toEqual(C);
                expect(urls.get(url_D)).toEqual(D);

                done();
            });
        });
    });
});