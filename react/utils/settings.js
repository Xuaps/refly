var Configry = require('configry');
var WK_DOCSETS = 'wk_docsets';
var defaultSettings = 
    {
        wk_docsets: [{
                "_links": {
                    "self": {
                        "href": "/api/docsets/JavaScript"
                    }
                },
                "name": "JavaScript",
                "start_uri": "/javascript/statements",
                "latest_version_date": "2015-03-12T09:19:56.144Z",
                "description": null,
                "is_active": true,
            }, {
                "_links": {
                    "self": {
                        "href": "/api/docsets/XPath"
                    }
                },
                "name": "XPath",
                "start_uri": "/xpath/functions",
                "latest_version_date": "2015-03-12T09:20:05.417Z",
                "description": null,
                "is_active": true,
            }]
    };

var Settings = function(){
    this.config = new Configry(defaultSettings, [WK_DOCSETS]);
}

Settings.prototype.getWorkingDocsets = function(){
    return this.config.get(WK_DOCSETS);
};

Settings.prototype.setWorkingDocsets = function(docsets){
    this.config.set(WK_DOCSETS, docsets, true);
};

module.exports = new Settings();
