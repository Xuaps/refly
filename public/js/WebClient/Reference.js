var Reference = function(options) {

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
            case 'children':
                self._retrieve_children(callback);
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
            self.parent = Reference.create({
                uri: uri_parts.join('/'),
                reference: uri_parts[uri_parts.length - 1],
                children: [ self ]
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
            self.children = data;
            callback(self.children);
        });
    };

    // ____________________________________________________

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
