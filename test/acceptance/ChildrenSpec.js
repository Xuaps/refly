var request = require('supertest');

describe('/api/children', function() {

    it('should return OK and the list of results for a succeeding query', function() {
        var result = null;

        waitsFor(function() {
            return result != null;
        });

        request('http://localhost:3000')
            .get('/api/children/test_2.html')
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
    
});
