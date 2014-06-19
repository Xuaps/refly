var slash = require('../app/slash');

exports.search = function(req, res) {
    slash.search(req.body).then(function(references) {
        res.send(references);
    });
};
