var slash = require('../app/slash');
var JSON = require('../app/JSON');

exports.search = function(req, res) {
    slash.search(req.query).then(function(references) {
        res.send(references);
    });
};

exports.get = function(req, res) {
    slash.get(req.params.uri).then(function(references) {
        res.send(references);
    });
};

exports.get_docsets = function(req, res) {
    slash.get_docsets(req.params.uri).then(function(docsets) {
		list = []
		for(var i=0;i<docsets.length;i++){
			docset = docsets[i];
			list.push({name: docset, path: docset.toLowerCase()});
		}
        res.send(list);
    });
};

exports.get_types = function(req, res) {
    slash.get_types(req.params.uri).then(function(types) {
		list = []
		for(var i=0;i<types.length;i++){
			type = types[i];
			list.push({name: type, path: type.toLowerCase()});
		}
        res.send(list);
    });
};

exports.children = function(req, res) {
    slash.children('/' + req.params.uri).then(function(references) {
        res.send(references);
    });
};

exports.branch = function(req, res) {
	if(req.params.uri[0]!='/'){
		uri = '/' + req.params.uri;
	}
    if (uri == null) {
        res.send([]);
    } else {
        slash.branch(uri).then(function(references){
			list = JSON.Flatten(references);
			res.send(list);
		});
    }
};

exports.breadcrumbs = function(req, res) {
	if(req.params.uri[0]!='/'){
		uri = '/' + req.params.uri;
	}

    if (uri == null) {
        res.send([]);
    } else {
        slash.breadcrumbs(uri).then(function(references){
			list = []
			for(key in references){
				item = references[key]
				list.push(
				{docset: item.docset, reference: item.reference, type: item.type, uri: item.uri});
			}
			res.send(list);
		});
    }
};
