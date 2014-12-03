
  	var _docsets_all=[
            {name: "Node", default_uri: "node/", path: "node", date: null, state : 'soon'},
            {name: "JavaScript", default_uri: "javascript/", path: "node", date: "2014-11-22T23:00:00.000Z", state : 'new'}];
  	var _docsets_active=[
            {name: "JavaScript", default_uri: "javascript/", path: "node", date: "2014-11-22T23:00:00.000Z", state : 'new'}
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
            }else if(resource==='docset_active'){
                data = callback(_docsets_active);
            }else if(resource==='docset_all'){
                data = callback(_docsets_all);
            }else if(resource==='branch'){
                data = callback(_formattedreferences);
            }else if(resource==='breadcrumbs'){
                data = callback(_formattedreferences);
            }else if(resource==='reference' || resource==='treeviewreference'){
                data = callback(_references);
            }
            return {then: function(callback){callback(data);}};
        }
    };
}

var storeMock = jest.genMockFromModule('../store.js');
storeMock.get.mockImplementation(get);

module.exports = storeMock;
