var spyAjaxAndReturn = function(result) {
    spyOn($, 'ajax').andCallFake(function() {
        return {
            done: function(callback) {
                callback(result);
            }
        };
    });
};

describe ('Reference', function () {

    describe ('create()', function() {

        it ('fails if missing uri', function () {
            try {
                Reference.create();
                fail();
            } catch(e) {
                expect(e.message).toMatch('missing');
            }
            Reference.create({ uri: '/some/reference' });
        });
    
        it ('stores the uri', function () {
            var reference = Reference.create({ uri: '/some/reference' });

            expect(reference.uri).toEqual('/some/reference');
        });
    
        it ('stores any other data', function () {
            var data = {
                uri: '/some/reference',
                content: 'a content',
                sampleField: 'value'
            };

            var reference = Reference.create(data);

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
            var reference = Reference.create({ uri: '/some/reference' });
            reference.get('content', function(response) {
                expect(response).toEqual(result.content);
            });
        });
    
        describe ('retrieves its data when queried', function () {
    
            it ('does not call the AJAX api if not queried', function() {
                Reference.create({ uri: '/some/reference' });

                expect($.ajax).not.toHaveBeenCalled();
            });
    
            it ('calls the AJAX api with the proper url', function() {
                var reference = Reference.create({ uri: '/some/reference' });
                reference.get('content');

                expect($.ajax).toHaveBeenCalled();
                expect($.ajax.mostRecentCall.args[0].url).toEqual('/api/get/some/reference');
            });
    
            it ('stores the result', function() {
                var reference = Reference.create({ uri: '/some/reference' });
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
            var theParent = Reference.create({
                uri: '/parent'
            });
            var theChild = Reference.create({
                parent: theParent,
                uri: '/parent/child'
            });

            theChild.get('parent', function(response) {
                expect(response).toEqual(theParent);
            });
        });

        it ('creates parent if missing', function() {
            var theChild = Reference.create({
                uri: '/parent/child'
            });

            theChild.get('parent', function(response) {
                expect(response).not.toBeUndefined();
                expect(response.uri).toEqual('/parent');
            });
        });

    });

    describe ('get("children")', function() {

        var children = [
            { uri: '/parent/aChild' },
            { uri: '/parent/anotherChild' }
        ];
 
        beforeEach(function() {
            spyOn($, 'ajax').andCallFake(function(params) {
                return {
                    done: function(callback) {
                        callback(children);
                    }
                };
            });
        });
 
        afterEach(function() {
            $.ajax.reset();
        });
        
        it ('returns children if given', function() {
            var theParent = Reference.create({
                uri: '/parent',
                children: [
                    Reference.create({ uri: '/parent/aChild' }),
                    Reference.create({ uri: '/parent/anotherChild' })
                ]
            });

            theParent.get('children', function(response) {
                expect(response.length).toEqual(2);
                expect(response[0].uri).toEqual('/parent/aChild');
                expect(response[1].uri).toEqual('/parent/anotherChild');
            });
        });

        describe ('retrieves children if necessary', function() {

            var theParent;

            beforeEach(function() {
                theParent = Reference.create({ uri: '/parent' });
            });

            it ('does not call the AJAX api if not queried', function() {
                expect($.ajax).not.toHaveBeenCalled();
            });
    
            it ('calls the AJAX api with the proper url', function() {
                theParent.get('children', function(response) {
                    expect($.ajax).toHaveBeenCalled();
                    expect($.ajax.mostRecentCall.args[0].url).toEqual('/api/children/parent');
                });
            });
    
            it ('returns the result', function() {
                theParent.get('children', function(response) {
                    expect(response.length).toEqual(2);
                    expect(response[0].uri).toEqual('/parent/aChild');
                    expect(response[1].uri).toEqual('/parent/anotherChild');
                });
            });
    
        });

    });

});
