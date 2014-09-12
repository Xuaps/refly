var Docset = function(uri) {
	
    var self = this;
	self.uri = uri;
	self.reference = uri;
	self.children = {};
	self.types = [];


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
                self.types.push({uri: self.uri+ ':' + typeData, reference: typeData});
				//self.fill(docset,typeData);
				
            });
        });
    };

}

Docset.init = function(callback) {
	Docset.instances = {};
    $.ajax({
        url: '/api/getdocsets',
        method: 'get'
    }).done(function(data) {
        data.forEach(function(referenceData) {
			if(referenceData!='test' && referenceData!='slash'){
				_docset = Docset.create({uri: referenceData});
				_docset.gettypes(referenceData);
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

    //if (Docset.instances[values.uri] == undefined) {
        Docset.instances[values.uri] = new Docset(values.uri);
    //}

    Docset.instances[values.uri]._store(values);
	return Docset.instances[values.uri];
}
