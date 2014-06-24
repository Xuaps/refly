var request = require('supertest');

describe('/search', function() {

    it('...', function() {
        var result = null;

        waitsFor(function() {
            return result != null;
        });

        var options = {
            reference: 'search',
            types: ['function'],
            docsets: ['slash']
        };

        request('http://localhost:3000')
            .get('/search')
            .send(options)
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
                expect(reference.type).toEqual('function');
                expect(reference.content).toBeUndefined();
                expect(reference.id).toBeUndefined();
            });
        });
    });
    
});
