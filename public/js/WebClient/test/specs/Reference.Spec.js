var spyAjaxAndReturn = function(result) {
    spyOn($, 'ajax').andCallFake(function() {
        return {
            done: function(callback) {
                callback(result);
            }
        };
    });
};

describe("A Reference", function () {

    describe('constructor', function() {

    	it ("fails if missing uri", function () {
            try {
                new Reference();
            } catch(e) {
                expect(e.message).toMatch('missing');
            }
            new Reference({ uri: '/some/reference' });
    	});
    
    	it ("stores the uri", function () {
            var reference = new Reference({ uri: '/some/reference' });
            expect(reference.uri).toEqual('/some/reference');
    	});
    
    	describe ("retrieves its data", function () {
    
            var result = { content: 'a content' };
    
            beforeEach(function() {
                spyAjaxAndReturn(result);
            });
    
            afterEach(function() {
                $.ajax.reset();
            });
            
            it ('does not call the AJAX api if load is false or omitted', function() {
                new Reference({
                    load: false,
                    uri: '/some/reference'
                });
                new Reference({
                    uri: '/some/reference'
                });
                expect($.ajax).not.toHaveBeenCalled();
            });
    
            it ('calls the AJAX api with the proper url', function() {
                new Reference({
                    load: true,
                    uri: '/some/reference'
                });
                expect($.ajax).toHaveBeenCalled();
                expect($.ajax.mostRecentCall.args[0].url).toEqual('/api/get/some/reference');
            });
    
            it ('stores the result', function() {
                var reference = new Reference({
                    load: true,
                    uri: '/some/reference'
                });
                expect(reference.content).toEqual(result.content);
            });
    
        });

        describe ('stores the parent info', function() {

            var result = { content: 'a content' };
    
            beforeEach(function() {
                spyAjaxAndReturn(result);
            });
    
            afterEach(function() {
                $.ajax.reset();
            });
            
            it ('stores parent if given', function() {
                var theParent = new Reference({
                    uri: '/parent'
                });
                var theChild = new Reference({
                    load: true,
                    parent: theParent,
                    uri: '/parent/child'
                });
                expect(theChild.parent).toEqual(theParent);
            });

            it ('creates parent if missing', function() {
                var theChild = new Reference({
                    load: true,
                    uri: '/parent/child'
                });
                expect(theChild.parent).not.toBeUndefined();
                expect(theChild.parent.uri).toEqual('/parent');
            });

        });

    });

});
