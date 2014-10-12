var Reference = {


	//Search for docset ans type unused
	search : function(uri,type){
        $.ajax({
            url: '/api/reference?docsets=' + uri + '&type=' + type,
            method: 'get'
        }).done(function(data) {
            data.forEach(function(referenceData) {
                self.children[referenceData.uri] = Reference.create(referenceData);
            });
        });
	},

    get_reference : function(uri, callback) {
		if(uri[0]!= '/') uri = '/' + uri;
        $.ajax({
            url: '/api/reference' + uri,
            method: 'get'
        }).done(function(data) {
            callback(data);
        });
    },

    get_parent : function(urichild, callback) {
        var uri_parts = urichild.split('/').slice(0, -1);
		var uri = uri_parts.join('/');
		this.get_reference(uri, function(reference){
			callback(reference);
		});
    },

    get_children : function(uri, callback) {
		if(uri[0]!= '/') uri = '/' + uri;
        $.ajax({
            url: '/api/references' + uri,
            method: 'get'
        }).done(function(data) {
            data.forEach(function(referenceData) {
				callback(referenceData);
            });
            
        });
    },

    get_branch : function(uri,callback) {
		if(uri[0]!= '/') uri = '/' + uri;
        $.ajax({
            url: '/api/referencesbranch' + uri,
            method: 'get'
        }).done(function(data) {
            callback(data);
        });
    }



}
