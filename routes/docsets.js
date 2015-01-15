var slash = require('../app/slash');
var JSON = require('../app/JSON');

exports.search = function(req, res) {
    slash.search(req.query).then(function(references) {
        res.send(references);
    });
};

//Will replace get_docsets soon.

exports.get_docsets = function(req, res) {
};


