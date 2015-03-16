var Proxy = function(){};

Proxy.getDefaultDocsets = function(){
    return wrapInPromise(Proxy.prototype._docsets);
};

Proxy.getTypes = function(docset){
    return wrapInPromise(Proxy.prototype._types);
};

Proxy.getReferences = function(docset, type, page){
    return wrapInPromise(Proxy.prototype._references);
};

var wrapInPromise = function(collection){
    return {
        then: function(fun){
            fun(collection);
            return { fail: function(fun){} };
        }
    };
};

module.exports = Proxy;
