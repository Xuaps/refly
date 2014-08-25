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
            var reference = Reference.create({
                uri: '/some/reference'
            });

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
            var aReference = Reference.create({
                uri: '/some/reference',
                aField: 'a value'
            });
            var anotherReference = Reference.create({
                uri: '/some/reference',
                anotherField: 'another value'
            });

            expect(aReference).toEqual(anotherReference);

            expect(aReference.anotherField).toEqual('another value');
            expect(anotherReference.aField).toEqual('a value');

            aReference.additionalField = 'additional value';

            expect(anotherReference.additionalField)
                .toEqual('additional value');
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
            var done = false;
            var reference = Reference.create({
                uri: '/some/reference'
            });

            waitsFor(function() { return done; });

            reference.get('content', function(response) {
                expect(response).toEqual(result.content);
                done = true;
            });
        });
    
        describe ('retrieves its data when queried', function () {
    
            it ('does not call AJAX api if not queried', function() {
                Reference.create({ uri: '/some/reference' });

                expect($.ajax).not.toHaveBeenCalled();
            });
    
            it ('calls the AJAX api with the proper url', function() {
                var reference = Reference.create({
                    uri: '/some/reference'
                });
                reference.get('content');

                expect($.ajax).toHaveBeenCalled();
                expect($.ajax.mostRecentCall.args[0].url)
                    .toEqual('/api/get/some/reference');
            });
    
            it ('stores the result', function() {
                var reference = Reference.create({
                    uri: '/some/reference'
                });
                reference.get('content');

                expect(reference.content).toEqual(result.content);
            });
    
            it ('calls the AJAX api only once', function() {
                var reference = Reference.create({
                    uri: '/some/reference'
                });
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
            var done = false;
            var theParent = Reference.create({
                uri: '/parent'
            });
            var theChild = Reference.create({
                parent: theParent,
                uri: '/parent/child'
            });

            waitsFor(function() { return done; });

            theChild.get('parent', function(response) {
                expect(response).toEqual(theParent);
                done = true;
            });
        });

        it ('creates parent if missing', function() {
            var done = false;
            var theChild = Reference.create({
                uri: '/parent/child'
            });

            waitsFor(function() { return done; });

            theChild.get('parent', function(response) {
                expect(response).not.toBeUndefined();
                expect(response.uri).toEqual('/parent');
                done = true;
            });
        });

        describe ('parent has this child', function() {

            it ('if given', function() {
                var done = false;
                var theParent = Reference.create({
                    uri: '/parent'
                });
                var theChild = Reference.create({
                    parent: theParent,
                    uri: '/parent/child'
                });

                waitsFor(function() { return done; });

                theChild.get('parent', function(response) {
                    expect(response).not.toBeUndefined();
                    expect(response.uri).toEqual('/parent');
                    expect(response.children['/parent/child'])
                        .toEqual(theChild);
                    done = true;
                });
            });

            it ('if missing', function() {
                var done = false;
                var theChild = Reference.create({
                    uri: '/parent/child'
                });

                waitsFor(function() { return done; });

                theChild.get('parent', function(response) {
                    expect(response).not.toBeUndefined();
                    expect(response.uri).toEqual('/parent');
                    expect(response.children['/parent/child'])
                        .toEqual(theChild);
                    done = true;
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
            var done = false;
            var first = Reference.create({
                uri: '/parent/aChild'
            });
            var second = Reference.create({
                uri: '/parent/anotherChild'
            });

            var children = {};
            children[first.uri] = first;
            children[second.uri] =second;
            var theParent = Reference.create({
                uri: '/parent',
                children: children
            });

            waitsFor(function() { return done; });

            theParent.get('children', function(response) {
                expect(response[first.uri]).toEqual(first);
                expect(response[second.uri]).toEqual(second);
                done = true;
            });
        });

        describe ('retrieves children if necessary', function() {

            var theParent;

            beforeEach(function() {
                theParent = Reference.create({ uri: '/parent' });
            });

            it ('does not call AJAX api if not queried', function() {
                expect($.ajax).not.toHaveBeenCalled();
            });
    
            it ('calls the AJAX api with the proper url', function() {
                theParent.get('children', function(response) {
                    expect($.ajax).toHaveBeenCalled();
                    expect($.ajax.mostRecentCall.args[0].url)
                        .toEqual('/api/children/parent');
                });
            });
    
            it ('returns the result', function() {
                var done = false;

                waitsFor(function() { return done; });

                theParent.get('children', function(response) {
                    expect(response['/parent/aChild'])
                        .not.toBeUndefined();
                    expect(response['/parent/anotherChild'])
                        .not.toBeUndefined();
                    done = true;
                });
            });
    
        });

        it ('mixes new children with existing references', function() {
            var theParent = Reference.create({ uri: '/parent' });
            var theChild = Reference.create({
                uri: '/parent/aChild',
                parent: theParent,
                aField: 'a value'
            });

            expect(theChild['aField']).toEqual('a value');
            expect(theParent.children['/parent/aChild'])
                .not.toBeUndefined();
            expect(theParent.children['/parent/anotherChild'])
                .toBeUndefined();

            var done = false;

            waitsFor(function() { return done; });

            theParent.get('children', function(response) {
                expect(theChild['aField']).toEqual('a value');
                expect(theParent.children['/parent/aChild'])
                    .not.toBeUndefined();
                expect(theParent.children['/parent/anotherChild'])
                    .not.toBeUndefined();
                done = true;
            });
        });

    });

    it ('get("root")', function() {

        var to_do = 4;
        waitsFor(function() { return to_do == 0; });

        Reference.create({ uri: '/a' }).get('root', function(r) {
            expect(r.uri).toEqual('/a');
            to_do--;
        });
        Reference.create({ uri: '/a/b' }).get('root', function(r) {
            expect(r.uri).toEqual('/a');
            to_do--;
        });
        Reference.create({ uri: '/a/b/c' }).get('root', function(r) {
            expect(r.uri).toEqual('/a');
            to_do--;
        });
        Reference.create({ uri: '/a/b/c/d' }).get('root', function(r) {
            expect(r.uri).toEqual('/a');
            to_do--;
        });

    });

    describe ('get("objects")', function() {

        var theReference;
        var child1;
        var child2;
        var grandchild1;
        var grandchild2;
        var grandchild3;

        beforeEach(function() {
            theReference = Reference.create({ uri: '/parent' });
            child1       = Reference.create({ uri: '/parent/c1' });
            child2       = Reference.create({ uri: '/parent/c2' });
            grandchild1  = Reference.create({ uri: '/parent/c1/c1' });
            grandchild2  = Reference.create({ uri: '/parent/c1/c2' });
            grandchild3  = Reference.create({ uri: '/parent/c2/c1' });

            spyOn($, 'ajax').andCallFake(function(params) {
                var response = [];
                switch (params.url) {
                    case '/api/children/parent': response = [
                            { uri: child1.uri },
                            { uri: child2.uri }
                        ]
                        break;
                    case '/api/children/parent/c1': response = [
                            { uri: grandchild1.uri },
                            { uri: grandchild2.uri }
                        ]
                        break;
                    case '/api/children/parent/c2': response = [
                            { uri: grandchild3.uri }
                        ]
                        break;
                }
                return {
                    done: function(callback) {
                        callback(response);
                    }
                };
            });
        });
 
        afterEach(function() {
            $.ajax.reset();
        });
        
        it ('returns all objects of recursive children', function() {
            var count = 0;

            waitsFor(function() { return count == 6; });

            var response = [];
            theReference.get('objects').each(function(object) {
                response.push(object);
                count++;
            });

            runs(function() {
                expect(response.length).toEqual(6);

                var uris = {};
                response.forEach(function(item) { uris[item.uri] = true; });

                expect(uris[grandchild1.uri]).toBeDefined();
                expect(uris[grandchild2.uri]).toBeDefined();
                expect(uris[child1.uri]).toBeDefined();
                expect(uris[grandchild3.uri]).toBeDefined();
                expect(uris[child2.uri]).toBeDefined();
                expect(uris[theReference.uri]).toBeDefined();
            });
        });

    });

});
