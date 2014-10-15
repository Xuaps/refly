var _docsets=[
        {name: "Node", url: "node/", type: "docset"},
        {name: "JavaScript", url: "javascript/", type: "docset"} 
    ];
var _types=['method','class', 'function'];
var _references=[
        {reference: "aaaa", uri: "node/aaaaa", type: "method"} 
    ];

function get (resource, filters) {
    var _filters = filters || {};
    return { 
        then: function(callback){
            var data;
            if(resource==='type'){
                data = callback(_types);
            }else if(resource==='docset'){
                data =callback(_docsets);
            }else{
                data =callback(_references);
            }
            return {then: function(callback){callback(data);}};
        }
    };
}

var storeMock = jest.genMockFromModule('../store.js');
storeMock.get.mockImplementation(get);

module.exports = storeMock;
