var slash = require('../app/slash');

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

exports.children = function(req, res) {
    slash.get_id(req.params.uri).then(function(id) {
        slash.children(id).then(function(references) {
            res.send(references);
        });
    });
};

