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
            var data;
            if(resource==='type'){
                data = callback(this._types);
            }else if(resource==='docset'){
                data =callback(this._docsets);
            }else{
                data =callback(this._references);
            }
            return {then: function(callback){callback(data);}};
        }.bind(this)
    };
};

module.exports = new ApiStub();
