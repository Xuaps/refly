var Reflux = require('reflux');
var BreadcrumbActions = require('./actions.js');
var data = require('../infrastructure/data.js');

module.exports = Reflux.createStore({

    init: function() {
        this.listenTo(BreadcrumbActions.load, this.onGetHierarchy);
    },
    
    onGetHierarchy: function(ref_id){
        data.getHierarchy(ref_id)
            .then(this._createHierarchyData)
            .then(function(data){
                this.trigger(data);
            }.bind(this))
            .fail(this.onFail);
    },
    
    _createHierarchyData: function(hierarchy){
        var h = hierarchy["_embedded"]["rl:hierarchy"];
        var ref = {ascendants:[]};
        ref.name = h[h.length-1].name;
        ref.docset = h[h.length-1].docset_name;
        for(var i=Math.max(0,h.length-3);i<h.length-1;i++){
            this._addAscendants(ref.ascendants, h[i]);
        }
        return ref;
    },

    _addAscendants: function(ascendants, ref){
        if(ascendants.length>0){
            ascendants[ascendants.length-1].name = '...';
        }

        ascendants.push({name: ref.name, uri: this._getRelativeRefUri(ref.uri), docset: this._getDocsetFromUri(ref.uri)});
    },

    _getDocsetFromUri: function(uri){
        var pos = uri.indexOf('/', 1);
        return uri.substring(1,pos);
    },

    _getRelativeRefUri: function(uri){
        var pos = uri.indexOf('/', 1);
        return uri.substring(pos+1,uri.length);
    },

    onFail: function(error){
        this.trigger(error);
    }
});

