var Reflux = require('reflux');
var TreeviewActions = require('./actions.js');
var data = require('../infrastructure/data.js');
var settings = require('../infrastructure/settings.js');
var PAGE_SIZE = 800;
module.exports = Reflux.createStore({

    init: function() {
        this.docsets = [];
        this.flatten_elements =[];
        this.listenTo(TreeviewActions.load, this.onGetActiveDocsets);
        this.listenTo(TreeviewActions.selectDocset, this.onGetTypes);
        this.listenTo(TreeviewActions.selectType, this.onSearchReferences);
        this.listenTo(settings, this.onGetActiveDocsets);
    },

    onGetActiveDocsets: function(){
        this.docsets = JSON.parse(JSON.stringify(settings.getWorkingDocsets()));
        this.trigger(this.docsets);
    },

    onGetTypes: function(docset){
        var active_docset = this.docsets
            .filter(function(doc){ return doc.name === docset; })[0];
        if(active_docset.types){
            this.trigger(this.docsets);
            return;
        }
        setTimeout(function(){data.getTypes(docset).then(function(response){ 
            active_docset.types = response['_embedded']['rl:types']; 
            this.trigger(this.docsets);
        }.bind(this)).done()}.bind(this));
    },

    onSearchReferences: function(docset, type_name, page){
        var node = this.docsets
            .filter(function(doc){ return doc.name === docset;})[0]
            .types.filter(function(type){ return type.name === type_name; })[0];
        if(!page){
            if(node.references){
                this.trigger(this.docsets);
                return;
            }
        }
        page = page || 1;
        setTimeout(function(){data.getReferences(docset, type_name, page, PAGE_SIZE).then(function (response){
            node.references = node.references || [];
            node.references = node.references.concat(response['_embedded']['rl:references']);
            this.trigger(this.docsets);    

            return response['_links'].next?this.onSearchReferences(docset, type_name, page+1):undefined;
        }.bind(this)).done()}.bind(this),0);
    },
});