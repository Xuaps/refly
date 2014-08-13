var Reference = require('../app/reference');

describe('reference', function(){
	describe('resolve parent uri', function(){
		it('should retur the parent uri', function(){
			var ref = new Reference('', '', '', '', '/domain/parent/reference');

			expect(ref.parent).toEqual('/domain/parent');
		});
	});

	describe('format properly content', function(){
		it('should transforms content according to business rules', function(){
			var ref = new Reference('', '', '', '<html><body><h1>TEST</h1></body></html>', '');

			expect(ref.content).toEqual('# TEST');
		});
	});

	describe('isEqual', function(){
		it('should return if two references are equals', function(){
			var ref1 = new Reference('test', 'name', 'type', '', '/ref/ref/reference');
			var ref2 = new Reference('test', 'name', 'type', '', '/ref/ref/reference2');

			expect(ref1.isEqual(ref2)).toBe(true);
		})
	})
});