var slash_request = require('../app/slash_request');
var nock = require('nock');

describe('slash_request', function(){
	it('should return the html', function(){
		var html = null;
		var domain = 'http://nodejs.org';
		var path = '/docs/latest/api';
		var expected_html = '<html><head></head><body></body></html>';
		nock(domain).get(path).reply(200,expected_html);

        waitsFor(function() {
            return html != null;
        });

        slash_request(domain+path).then(function(result) {
            html = result;
        });

        runs(function() {
            expect(html).toEqual(expected_html);
        });
	})
})