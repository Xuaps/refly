var slash = require('../app/slash');

exports.search = function(req, res) {
    slash.search(req.query).then(function(references) {
        res.send(references);
    });
};

exports.get = function(req, res) {
    slash.get(req.params).then(function(references) {
        res.send(references);
    });
};