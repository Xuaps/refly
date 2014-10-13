function ApiStub(){
    this._docsets=[
            {name: "Node", uri: "node/", type: "docset"},
            {name: "JavaScript", uri: "javascript/", type: "docset"} 
        ];
}

ApiStub.prototype.get =function (resource) {
    return { 
        then: function(callback){
            callback(this._docsets);
        }.bind(this)
    };
};

module.exports = new ApiStub();
