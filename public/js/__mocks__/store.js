function ApiStub(){
    this._docsets=[
            {name: "Node", url: "node/", type: "docset"},
            {name: "JavaScript", url: "javascript/", type: "docset"} 
        ];
    this._types=[
        {name: 'method', url: 'node/'},
        {name: 'class', url: 'node/'},
        {name: 'function', url: 'node/'}
    ];
}

ApiStub.prototype.get =function (resource, filters) {
    var _filters = filters || {};
    return { 
        then: function(callback){
            if(_filters.docset){
                callback(this._types);
            }else{
                callback(this._docsets);
            }
        }.bind(this)
    };
};

module.exports = new ApiStub();
