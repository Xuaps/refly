var Docset = function(uri) {
	
    var self = this;
	var uri = uri;
	self.children = {};


    self._fill = function() {
        $.ajax({
            url: '/api/search?docset=' + self.uri +'&reference=',
            method: 'get'
        }).done(function(data) {
            data.forEach(function(referenceData) {
                self.children[referenceData.uri] = Reference.create(referenceData);
            });
        });
    };

    self._store = function(fields) {
        for (var i in fields) {
            self[i] = fields[i];
        }
    };

}

Docset.initialize = function() {
	Docset.instances = {};
    $.ajax({
        url: '/api/getdocsets',
        method: 'get'
    }).done(function(data) {
        data.forEach(function(referenceData) {
			if(referenceData!='test' && referenceData!='slash'){
				_docset = Docset.create({uri: referenceData});
				_docset._fill();

			}
        });
    });
};

//Create a new object Docset
Docset.create = function(values) {
    if (!values || !values.uri) {
        throw new Error('missing argument \'uri\'');
    }

    if (Docset.instances[values.uri] == undefined) {
        Docset.instances[values.uri] = new Docset(values.uri);
    }

    Docset.instances[values.uri]._store(values);
	return Docset.instances[values.uri];
}
