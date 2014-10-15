function ApiStub(){
    this._docsets=[
            {name: "Node", url: "node/", type: "docset"},
            {name: "JavaScript", url: "javascript/", type: "docset"}
        ];
    this._types=['method','class', 'function'];
    this._references=[
            {reference: "aaaa", uri: "/node/aaaaa", type: "method"} 
        ];
    this._formattedreferences=[
   {"docset":"Node.js v0.10.29","reference":"Buffer","type":"module","uri":"/node.js v0.10.29/buffer"},
   {"docset":"Node.js v0.10.29","reference":"Buffer","type":"class","uri":"/node.js v0.10.29/buffer/buffer"}
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
                data = callback(this._docsets);
            }else if(resource==='parent'){
                data = callback(this._references[0]);
            }else if(resource==='branch'){
                data = callback(this._formattedreferences);
            }else{
                data = callback(this._references);
            }
            return {then: function(callback){callback(data);}};
        }.bind(this)
    };
};

module.exports = new ApiStub();
