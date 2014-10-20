
  	var _docsets=[
            {name: "Node", url: "node/", type: "docset"},
            {name: "JavaScript", url: "javascript/", type: "docset"}
        ];
   	var _types=['method','class', 'function'];
   	var _references=[
            {reference: "aaaa", docset:'node', ref_uri:'aaaaa', uri: "/node/aaaaa", type: "method"} 
        ];
    var _formattedreferences=[
   {"docset":"node.js v0.10.29","reference":"Buffer","type":"module","uri":"/node.js v0.10.29/buffer", 
   "ref_uri": "buffer"},
   {"docset":"node.js v0.10.29","reference":"Buffer","type":"class","uri":"/node.js v0.10.29/buffer/buffer",
   "ref_uri": "buffer/buffer"}
	];

function get (resource, filters) {
    var _filters = filters || {};
    return { 
        then: function(callback){
            var data;
            if(resource==='type'){
                data = callback(_types);
            }else if(resource==='docset'){
                data = callback(_docsets);
            }else if(resource==='parent'){
                data = callback(_references[0]);
            }else if(resource==='branch'){
                data = callback(_formattedreferences);
            }else{
                data = callback(_references);

            }
            return {then: function(callback){callback(data);}};
        }
    };
}

var storeMock = jest.genMockFromModule('../store.js');
storeMock.get.mockImplementation(get);

module.exports = storeMock;
