var request = require('supertest');

describe('/api/references/:uri(*)', function() {

    it('should return OK and the list of results for a succeeding query', function() {
        var result = null;

        waitsFor(function() {
            return result != null;
        });

        request('http://localhost:3000')
            .get('/api/references/test_2.html')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                result = res;
            });

        runs(function() {
            expect(result.status).toEqual(200);

            expect(result.body.length).toBeGreaterThan(1);
            result.body.forEach(function(reference) {
                expect(reference.reference).toBeDefined();
                expect(reference.docset).toBeDefined();
                expect(reference.type).toBeDefined();
                expect(reference.uri).toBeDefined();
                expect(reference.content).toBeUndefined();
                expect(reference.id).toBeUndefined();
            });
        });
    });
    
    it('should return OK and an empty list of results if querying for an unexisting parent', function() {
        var result = null;

        waitsFor(function() {
            return result != null;
        });

        request('http://localhost:3000')
            .get('/api/references/this_should_be_an_unexisting_uri.html')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                result = res;
            });

        runs(function() {
            expect(result.status).toEqual(200);

            expect(result.body.length).toEqual(0);
        });
    });
    
});
