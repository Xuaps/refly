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

    beforeEach(function() {
        Reference.clearCache();
    });

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

        it ('caches created references by uri', function() {
            var aReference = Reference.create({ uri: '/some/reference', aField: 'a value' });
            var anotherReference = Reference.create({ uri: '/some/reference', anotherField: 'another value' });

            expect(aReference).toEqual(anotherReference);

            expect(aReference.anotherField).toEqual('another value');
            expect(anotherReference.aField).toEqual('a value');

            aReference.additionalField = 'additional value';

            expect(anotherReference.additionalField).toEqual('additional value');
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
    
            it ('calls the AJAX api only once', function() {
                var reference = Reference.create({ uri: '/some/reference' });
                reference.get('content');
                reference.get('content');

                expect($.ajax).toHaveBeenCalled();
                expect($.ajax.calls.length).toEqual(1);
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

        describe ('parent has this child', function() {

            it ('if given', function() {
                var theParent = Reference.create({
                    uri: '/parent'
                });
                var theChild = Reference.create({
                    parent: theParent,
                    uri: '/parent/child'
                });

                theChild.get('parent', function(response) {
                    expect(response).not.toBeUndefined();
                    expect(response.uri).toEqual('/parent');
                    expect(response.children['/parent/child']).toEqual(theChild);
                });
            });

            it ('if missing', function() {
                var theChild = Reference.create({
                    uri: '/parent/child'
                });

                theChild.get('parent', function(response) {
                    expect(response).not.toBeUndefined();
                    expect(response.uri).toEqual('/parent');
                    expect(response.children['/parent/child']).toEqual(theChild);
                });
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
            var first = Reference.create({ uri: '/parent/aChild' });
            var second = Reference.create({ uri: '/parent/anotherChild' });

            var children = {};
            children[first.uri] = first;
            children[second.uri] =second;
            var theParent = Reference.create({
                uri: '/parent',
                children: children
            });

            theParent.get('children', function(response) {
                expect(response[first.uri]).toEqual(first);
                expect(response[second.uri]).toEqual(second);
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
                    expect(response['/parent/aChild']).not.toBeUndefined();
                    expect(response['/parent/anotherChild']).not.toBeUndefined();
                });
            });
    
        });

        it ('properly mixes new children with existing references', function() {
            var theParent = Reference.create({ uri: '/parent' });
            var theChild = Reference.create({ uri: '/parent/aChild', parent: theParent, aField: 'a value' });

            expect(theChild['aField']).toEqual('a value');
            expect(theParent.children['/parent/aChild']).not.toBeUndefined();
            expect(theParent.children['/parent/anotherChild']).toBeUndefined();

            theParent.get('children', function(response) {
                expect(theChild['aField']).toEqual('a value');
                expect(theParent.children['/parent/aChild']).not.toBeUndefined();
                expect(theParent.children['/parent/anotherChild']).not.toBeUndefined();
            });
        });

    });

    it ('get("root")', function() {

        Reference.create({ uri: '/a' }).get('root', function(root) {
            expect(root.uri).toEqual('/a');
        });
        Reference.create({ uri: '/a/b' }).get('root', function(root) {
            expect(root.uri).toEqual('/a');
        });
        Reference.create({ uri: '/a/b/c' }).get('root', function(root) {
            expect(root.uri).toEqual('/a');
        });
        Reference.create({ uri: '/a/b/c/d' }).get('root', function(root) {
            expect(root.uri).toEqual('/a');
        });

    });

});
