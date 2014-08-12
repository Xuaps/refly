function Reference(options) {

    var self = this;

    self.get = function(fieldName, callback) {
        callback = callback || function() {};

        if (self[fieldName]) {
            callback(self[fieldName]);
        } else {
            self._retrieve(fieldName, callback);
        }
    };

    // ____________________________________________________

    self._init = function() {
        if (!options || !options.uri) {
            throw new Error('missing argument \'uri\'');
        }

        self.children = [];
        self._store(options);

        return self;
    };

    self._store = function(fields) {
        for (var i in fields) {
            self[i] = fields[i];
        }
    };

    self._retrieve = function(fieldName, callback) {
        switch (fieldName) {
            case 'parent':
                self._retrieve_parent(callback);
                return;
            default:
                self._retrieve_normal_field(fieldName, callback);
        };
    };

    self._retrieve_normal_field = function(fieldName, callback) {
        $.ajax({
            url: '/api/get' + self.uri,
            method: 'get'
        }).done(function(data) {
            self._store(data);
            callback(self[fieldName]);
        });
    };

    self._retrieve_parent = function(callback) {
        var uri_parts = self.uri.split('/').slice(0, -1);
        try {
            self.parent = new Reference({
                uri: uri_parts.join('/'),
                reference: uri_parts[uri_parts.length - 1],
                children: [ self ]
            });
        } catch (e) {
            self.parent = null;
        }
        callback(self.parent);
    };

    self._load = function() {
        $.ajax({
            url: '/api/get' + self.uri,
            method: 'get'
        }).done(function(data) {
            self.content = data.content;

        });
    };

    // ____________________________________________________

/*
            $.ajax({
                url: '/api/children' + self.parent.uri,
                method: 'get'
            }).done(function(siblings) {
                $.ajax({
                    url: '/api/children' + self.uri,
                    method: 'get'
                }).done(function(children) {
                    self.parent.children = [];
                    if (siblings.length > 0) {
                        siblings.forEach(function(sibling) {
                            sibling.parent = self.parent;
                            self.parent.children.push(new Reference(sibling));
                        });
                    } else {
                        self.parent.children.push(new Reference(data));
                    }
                    self.parent.children.forEach(function(node) {
                        if (node.uri == self.uri) {
                            node.children = [];
                            children.forEach(function(child) {
                                child.parent = node;
                                node.children.push(new Reference(child));
                            });
                        }
                    });
                    self._setChildren(children, function() { self.onLoadChildren(self) });
                });
            });
*/

    self._setChildren = function(children, callback) {
        var completed = 0;
        var total = children.length;

        if (total == 0) {
            callback();
        }

        for (var i  in children) {
            (function(i) {
                self.children[i] = new Reference({
                    uri: children[i].uri,
                    parent: self
                });
                $.ajax({
                    url: '/api/children' + children[i].uri,
                    method: 'get'
                }).done(function(descendants) {
                    self.children[i]._setChildren(descendants, function() {
                        completed++;
                        if (completed == total) {
                            callback();
                        }
                    });
                });
            })(i);
        }
    };

    self.objects = function() {
        var objects = [];
        self.children.forEach(function(child) {
            child.objects().forEach(function(obj) {
                objects.push(obj);
            });
            objects.push({
                uri: child.uri,
                docset: child.docset,
                type: child.type,
                reference: child.reference
            });
        });
        return objects;
    };

    self.root = function() {
        return (self.parent == null) ? self : self.parent.root();
    };

    return self._init();
}
