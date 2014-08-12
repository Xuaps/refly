var spyAjaxAndReturn = function(result) {
    spyOn($, 'ajax').andCallFake(function() {
        return {
            done: function(callback) {
                callback(result);
            }
        };
    });
};

describe('A Reference', function () {

    describe('constructor', function() {

        it ('fails if missing uri', function () {
            try {
                new Reference();
                fail();
            } catch(e) {
                expect(e.message).toMatch('missing');
            }
            new Reference({ uri: '/some/reference' });
        });
    
        it ('stores the uri', function () {
            var reference = new Reference({ uri: '/some/reference' });

            expect(reference.uri).toEqual('/some/reference');
        });
    
        it ('stores any other data', function () {
            var data = {
                uri: '/some/reference',
                content: 'a content',
                sampleField: 'value'
            };

            var reference = new Reference(data);

            expect(reference.uri).toEqual(data.uri);
            expect(reference.content).toEqual(data.content);
            expect(reference.sampleField).toEqual(data.sampleField);
        });

    });
    
    describe ('get()', function () {

        var result = { content: 'a content' };
    
        beforeEach(function() {
            spyAjaxAndReturn(result);
        });
   
        afterEach(function() {
            $.ajax.reset();
        });
            
        it ('returns the queried data', function() {
            var reference = new Reference({ uri: '/some/reference' });
            reference.get('content', function(response) {
                expect(response).toEqual(result.content);
            });
        });
    
        describe ('retrieves its data when queried', function () {
    
            it ('does not call the AJAX api if not queried', function() {
                new Reference({ uri: '/some/reference' });

                expect($.ajax).not.toHaveBeenCalled();
            });
    
            it ('calls the AJAX api with the proper url', function() {
                var reference = new Reference({ uri: '/some/reference' });
                reference.get('content');

                expect($.ajax).toHaveBeenCalled();
                expect($.ajax.mostRecentCall.args[0].url).toEqual('/api/get/some/reference');
            });
    
            it ('stores the result', function() {
                var reference = new Reference({ uri: '/some/reference' });
                reference.get('content');

                expect(reference.content).toEqual(result.content);
            });
    
        });

    });

    describe ('get("parent")', function() {

        var result = { content: 'a content' };
 
        beforeEach(function() {
            spyAjaxAndReturn(result);
        });
 
        afterEach(function() {
            $.ajax.reset();
        });
        
        it ('returns parent if given', function() {
            var theParent = new Reference({
                uri: '/parent'
            });
            var theChild = new Reference({
                parent: theParent,
                uri: '/parent/child'
            });

            theChild.get('parent', function(response) {
                expect(response).toEqual(theParent);
            });
        });

        it ('creates parent if missing', function() {
            var theChild = new Reference({
                uri: '/parent/child'
            });

            theChild.get('parent', function(response) {
                expect(response).not.toBeUndefined();
                expect(response.uri).toEqual('/parent');
            });
        });

    });

});
