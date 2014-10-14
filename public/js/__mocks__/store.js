function ApiStub(){
    this._docsets=[
            {name: "Node", url: "node/", type: "docset"},
            {name: "JavaScript", url: "javascript/", type: "docset"} 
        ];
    this._types=['method','class', 'function'];
    this._references=[
            {reference: "aaaa", uri: "node/aaaaa", type: "method"} 
        ];
}

ApiStub.prototype.get =function (resource, filters) {
    var _filters = filters || {};
    return { 
        then: function(callback){
            if(resource==='type'){
                callback(this._types);
            }else if(resource==='docset'){
                callback(this._docsets);
            }else{
                callback(this._references);
            }
        }.bind(this)
    };
};

module.exports = new ApiStub();
