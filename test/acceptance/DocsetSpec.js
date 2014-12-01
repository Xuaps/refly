var request = require('supertest');

describe('/api/docsets?', function() {

    it('should return all the active docsets', function() {
        var result = null;

        waitsFor(function() {
            return result != null;
        });

        request('http://localhost:3000')
            .get('/api/docsets?state=active')
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                result = res;
            });

        runs(function() {
            expect(result.status).toEqual(200);
            expect(result.body.length).toBeGreaterThan(0);
            result.body.forEach(function(docset) {
                expect(docset.state).not.toEqual('soon');
                expect(docset.state).not.toEqual('disabled');
                expect(docset.state).not.toEqual('');
            });
        });
    });
