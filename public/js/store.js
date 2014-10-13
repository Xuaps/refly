var jQuery = require('jquery-browserify');

function Api(){
    this._url='/api/docsets';
}

Api.prototype.get = function (resource){
    return jQuery.ajax({
        url: this._url,
        method: 'GET'
    });
};

module.exports = new Api();
