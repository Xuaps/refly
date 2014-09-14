var Docset = function(options) {
	
    var self = this;
	self.len = 0;
	self.type = 'docset';
	self.uri = '';
	self.reference = '';
	self.children = [];
	self.types = [];
	self.schema = 'docset';

	// fill with references
    self.fill = function(uri, type) {
		$.ajax({
            url: '/api/search?docsets=' + uri + '&type=' + type,
            method: 'get'
        }).done(function(data) {
            data.forEach(function(referenceData) {
				self.children[type] = [];
                self.children[type].push(Reference.create(referenceData));
            });
        });
    };

    self._store = function(fields) {
        for (var i in fields) {
            self[i] = fields[i];
        }
    };

    self.gettypes = function(docset) {
        $.ajax({
            url: '/api/gettypes?docsets=' + docset,
            method: 'get'
        }).done(function(data) {
            data.forEach(function(typeData) {
                self.children.push(Type.create({uri: self.uri+ ':' + typeData, reference: typeData, schema: 'type', type: typeData}));
				self.len++;
				
            });
        });
    };

}

Docset.init = function(callback) {
	Type.init();
	Docset.instances = {};
    $.ajax({
        url: '/api/getdocsets',
        method: 'get'
    }).done(function(data) {
        data.forEach(function(docsetData) {
			// if for testing only remove in production
			if(docsetData!='test' && docsetData!='slash'){
				_docset = Docset.create({uri: self.uri+ ':' + docsetData, reference: docsetData, schema: 'docset', type: 'docset'});
				_docset.gettypes(docsetData);
			}
        });
		callback();
    });
};

//Create a new object Docset
Docset.create = function(values) {
    if (!values || !values.uri) {
        throw new Error('missing argument \'uri\'');
    }

    if (Docset.instances[values.uri] == undefined) {
        Docset.instances[values.uri] = new Docset(values);
    }
    Docset.instances[values.uri]._store(values);
	return Docset.instances[values.uri];
}
