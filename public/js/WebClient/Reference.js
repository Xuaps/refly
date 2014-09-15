var Reference = function(options) {

    var self = this;
	self.len = 0;
    self.children = {};
	self.schema = 'reference';


	//Search for docset ans type unused
	self.search = function(uri,type){
        $.ajax({
            url: '/api/search?docsets=' + uri + '&type=' + type,
            method: 'get'
        }).done(function(data) {
            data.forEach(function(referenceData) {
                self.children[referenceData.uri] = Reference.create(referenceData);
            });
        });
	}
	// Get data from a specific field
    self.get = function(fieldName, callback) {
        callback = callback || function() {};
		return self._retrieve(fieldName, callback);
    };

    // ____________________________________________________
	// refresh data from field
	self.refresh = function(fieldName) {
		self[fieldName]='';
	};

    // ____________________________________________________
	// checks whether the value is already loaded. and returns it

    self._field_valid = function(fieldName) {
        if (fieldName == 'children') {
            return self._all_children_retrieved;
        }
        return self[fieldName];
    };

    // ____________________________________________________
	//  Store data in the internal array

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
                self.get_children(callback);
                return;
            case 'root':
                self._retrieve_root(callback);
                return;
            default:
                self._retrieve_normal_field(fieldName, callback);
        };
    };

	// return field from a reference through the uri
    self._retrieve_normal_field = function(fieldName, callback) {
        $.ajax({
            url: '/api/get' + self.uri,
            method: 'get'
        }).done(function(data) {
            self._store(data);
            callback(self[fieldName]);
        });
    };


	// return the parent of a given url
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

	//return the children url of a given url
    self.get_children = function(callback) {
        $.ajax({
            url: '/api/children' + self.uri,
            method: 'get'
        }).done(function(data) {
            data.forEach(function(referenceData) {
                self.children[referenceData.uri] = Reference.create(referenceData);
				//self.children[referenceData.uri].get_children(function(){});
				self.len++;
            });
            callback(self.children);
        });
    };

	// return de root of a given url (unused)
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
