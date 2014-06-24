var slash = require('../app/slash');
var querystring = require('querystring');

exports.search = function(req, res) {
    slash.search(req.query).then(function(references) {
        res.send(references);
    });
};
