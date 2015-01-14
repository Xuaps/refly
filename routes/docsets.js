var slash = require('../app/slash');
var JSON = require('../app/JSON');

exports.search = function(req, res) {
    slash.search(req.query).then(function(references) {
        res.send(references);
    });
};

//Will replace get_docsets soon.

exports.get_docsets = function(req, res) {
    slash.get_docsetsbydate(req.query).then(function(docsets) {
		list = []
		for(var i=0;i<docsets.length;i++){
			docset = docsets[i];
			list.push({name: docset.docset
, default_uri: docset.default_uri, path: docset.docset.toLowerCase(), date: docset.update_date, label: docset.label, active: docset.active});
		}
        res.send(list);
    });
};


