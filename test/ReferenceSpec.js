var Reference = require('../app/reference');

describe('reference', function(){
	describe('resolve parent uri', function(){
		it('should retur the parent uri', function(){
			ref = new Reference('', '', '', '', '/domain/parent/reference');

			expect(ref.parent).toEqual('/domain/parent');
		});
	});

	describe('format properly content', function(){
		it('should transforms content according to business rules', function(){
			ref = new Reference('', '', '', '<html><body><h1>TEST</h1></body></html>', '');

			expect(ref.content).toEqual('# TEST');
		});
	});
});