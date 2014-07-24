var request = require('supertest');

describe('/api/get', function() {

    it('should return a reference with its content', function() {
        var result = null;

        waitsFor(function() {
            return result != null;
        });

        request('http://localhost:3000')
            .get('/api/get/test_3.html')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                result = res;
            });

        runs(function() {
            expect(result.status).toEqual(200);
            expect(result.body.reference).toEqual('search');
            expect(result.body.docset).toEqual('java');
            expect(result.body.type).toEqual('function');
            expect(result.body.content).toEqual('This is an example\n-----\n\nexample.foo(bar)\n\n**some** descriptive *text*\n\n\t\t\t\tfunction example.foo(bar){\n\t\t\t\t\treturn bar;\n\t\t\t\t}');
            expect(result.body.uri).toEqual('test_3.html');
            expect(result.body.id).toBeUndefined();
        });
    });
    
});
