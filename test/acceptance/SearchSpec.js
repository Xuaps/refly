var request = require('supertest');

describe('/api/search', function() {

    it('should return OK and the list of results for a succeeding query', function() {
        var result = null;

        waitsFor(function() {
            return result != null;
        });

        request('http://localhost:3000')
            .get('/api/search?reference=search&types=function&types=class&docsets=java')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                result = res;
            });

        runs(function() {
            expect(result.status).toEqual(200);
            expect(result.body.length).toBeGreaterThan(0);
            result.body.forEach(function(reference) {
                expect(reference.reference).toEqual('search');
                expect(reference.docset).toEqual('java');
                expect(reference.type).toEqual('function');
                expect(reference.uri).toEqual('/test_3.html');
                expect(reference.content).toBeUndefined();
                expect(reference.id).toBeUndefined();
            });
        });
    });
    
    describe('should return OK and the list of results for queries not including all fields', function() {

        it ('no docset', function() {
            var result = null;

            waitsFor(function() {
                return result != null;
            });

            request('http://localhost:3000')
                .get('/api/search?reference=search&types=function&types=class')
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    result = res;
                });

            runs(function() {
                expect(result.status).toEqual(200);
                expect(result.body.length).toBeGreaterThan(0);
                result.body.forEach(function(reference) {
                    expect(reference.reference).toEqual('search');
                    expect(reference.type).toEqual('function');
                    expect(reference.uri).not.toBeUndefined()
                    expect(reference.content).toBeUndefined();
                    expect(reference.id).toBeUndefined();
                });
            });
        });

        it ('no types', function() {
            var result = null;

            waitsFor(function() {
                return result != null;
            });

            request('http://localhost:3000')
                .get('/api/search?reference=search&docsets=slash')
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    result = res;
                });

            runs(function() {
                expect(result.status).toEqual(200);
                expect(result.body.length).toBeGreaterThan(0);
                result.body.forEach(function(reference) {
                    expect(reference.reference).toEqual('search');
                    expect(reference.docset).toEqual('slash');
                    expect(reference.uri).not.toBeUndefined()
                    expect(reference.content).toBeUndefined();
                    expect(reference.id).toBeUndefined();
                });
            });
        });

    });
    
});
