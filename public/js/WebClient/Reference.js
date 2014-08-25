var Reference = function(options) {

    var self = this;

    self.children = {};
    self._all_children_retrieved = false;

    self.get = function(fieldName, callback) {
        callback = callback || function() {};

        if (self._field_valid(fieldName)) {
            callback(self[fieldName]);
        } else {
            return self._retrieve(fieldName, callback);
        }
    };

    self._field_valid = function(fieldName) {
        if (fieldName == 'children') {
            return self._all_children_retrieved;
        }
        return self[fieldName];
    };

    // ____________________________________________________

    self._store = function(fields) {
        for (var i in fields) {
            self[i] = fields[i];
            if (i == 'parent') {
                self['parent'].children[fields['uri']] = self;
            }
        }
    };

    self._retrieve = function(fieldName, callback) {
        switch (fieldName) {
            case 'parent':
                self._retrieve_parent(callback);
                return;
            case 'children':
                self._retrieve_children(callback);
                return;
            case 'root':
                self._retrieve_root(callback);
                return;
            case 'objects':
                return self._retrieve_objects();
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
            var children = {};
            children[self.uri] = self;
            self.parent = Reference.create({
                uri: uri_parts.join('/'),
                reference: uri_parts[uri_parts.length - 1],
                children: children
            });
        } catch (e) {
            self.parent = null;
        }
        callback(self.parent);
    };

    self._retrieve_children = function(callback) {
        $.ajax({
            url: '/api/children' + self.uri,
            method: 'get'
        }).done(function(data) {
            data.forEach(function(referenceData) {
                self.children[referenceData.uri] = Reference.create(referenceData);
            });
            self._all_children_retrieved = true;
            callback(self.children);
        });
    };

    self._retrieve_root = function(callback) {
        self.get('parent', function(parent) {
            if (parent == null) {
                callback(self);
            } else {
                parent.get('root', function(root) {
                    self.root = root;
                    callback(root);
                });
            }
        });
    };

    self._retrieve_objects = function() {
        return {
            each: function(callback) {
                callback({
                    uri: self.uri,
                    docset: self.docset,
                    type: self.type,
                    reference: self.reference
                });
                self.get('children', function(children) {
                    for (var i in children) {
                        var child = children[i];
                        child.get('objects').each(callback);
                    }
                });
                return this;
            }
        };

    };

    return self;
}

Reference.clearCache = function() {
    Reference.instances = {};
};

Reference.create = function(options) {
    if (!options || !options.uri) {
        throw new Error('missing argument \'uri\'');
    }

    if (Reference.instances[options.uri] == undefined) {
        Reference.instances[options.uri] = new Reference(options);
    }

    Reference.instances[options.uri]._store(options);

    return Reference.instances[options.uri];
}

Reference.clearCache();
