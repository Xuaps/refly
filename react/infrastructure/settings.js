var WK_DOCSETS = 'wk_docsets';
var USER_DOCSETS = 'user_docsets';
var defaultSettings = 
    {
        wk_docsets: [{
                "_links": {
                    "self": {
                        "href": "/api/docsets/JavaScript"
                    }
                },
                "name": "JavaScript",
                "start_uri": "/javascript/statements_and_declarations",
                "latest_version_date": "2015-03-12T09:19:56.144Z",
                "description": null,
                "is_active": true,
            }, {
                "_links": {
                "self": {
                "href": "/api/docsets/DOM"
                }
                },
                "name": "DOM",
                "start_uri": "/dom/document",
                "latest_version_date": "2015-03-27T10:43:27.569Z",
                "description": null,
                "is_active": true,
                "image": "http://localhost:3000/img/languages/dom-logo.png",
                "bigimage": "http://localhost:3000/img/languages/dom-biglogo.jpg"
                },{
                "_links": {
                "self": {
                "href": "/api/docsets/DOM Events"
                }
                },
                "name": "DOM Events",
                "start_uri": "/dom_events/click",
                "latest_version_date": "2015-03-27T10:43:37.046Z",
                "description": null,
                "is_active": true,
                "image": "http://localhost:3000/img/languages/dom events-logo.png",
                "bigimage": "http://localhost:3000/img/languages/dom events-biglogo.jpg"
                },{
                "_links": {
                "self": {
                "href": "/api/docsets/HTML"
                }
                },
                "name": "HTML",
                "start_uri": "/html/html_attribute_reference",
                "latest_version_date": "2015-03-27T10:43:38.470Z",
                "description": null,
                "is_active": true,
                "image": "http://localhost:3000/img/languages/html-logo.png",
                "bigimage": "http://localhost:3000/img/languages/html-biglogo.jpg"
                },{
                "_links": {
                "self": {
                "href": "/api/docsets/CSS"
                }
                },
                "name": "CSS",
                "start_uri": "/css/universal_selectors",
                "latest_version_date": "2015-03-27T10:43:25.749Z",
                "description": null,
                "is_active": true,
                "image": "http://localhost:3000/img/languages/css-logo.png",
                "bigimage": "http://localhost:3000/img/languages/css-biglogo.jpg"
                },{
                "_links": {
                "self": {
                "href": "/api/docsets/NodeJS"
                }
                },
                "name": "NodeJS",
                "start_uri": "/nodejs/assert",
                "latest_version_date": "2015-03-27T10:43:49.177Z",
                "description": null,
                "is_active": true,
                "image": "http://localhost:3000/img/languages/nodejs-logo.png",
                "bigimage": "http://localhost:3000/img/languages/nodejs-biglogo.jpg"
                },{
                "_links": {
                "self": {
                "href": "/api/docsets/React"
                }
                },
                "name": "React",
                "start_uri": "/react/thinking_in_react",
                "latest_version_date": "2015-03-27T10:47:52.685Z",
                "description": null,
                "is_active": true,
                "image": "http://localhost:3000/img/languages/react-logo.png",
                "bigimage": "http://localhost:3000/img/languages/react-biglogo.jpg"
                },
            ]
    };

var Reflux = require('reflux');
var Configry = require('configry');
var ls = require('local-storage');
var data = require('./data.js');
var Settings = Reflux.createStore({
    init: function() {
        this.config = new Configry(defaultSettings, [WK_DOCSETS]);
        if(ls.get(USER_DOCSETS)===null){
            ls.set(USER_DOCSETS, this.config.get(WK_DOCSETS));
        }
    },
    
    getWorkingDocsets:  function(){
        return this.config.get(WK_DOCSETS);
    },

    getLocalDocsets:  function(){
        return ls.get(USER_DOCSETS);
    },

    setWorkingDocsets:  function(docsets){
        this.config.set(WK_DOCSETS, docsets, true);
        this.trigger(docsets);
    },

    getUserDocsets: function(){
        return data.getCurrentUser()
        .then(function (user) {
             return data.getUserDocsets(user.email);
        }.bind(this));
    },

    setUserDocset: function(activedocsets){
        return data.setUserDocsets(activedocsets);
    },

    setLocalDocsets:  function(docsets){
        ls.set(USER_DOCSETS, docsets);
        this.trigger(docsets);
    }
});

module.exports = Settings;
