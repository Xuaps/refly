var Data = function(){};

Data.getDefaultDocsets = function(){
    return this.wrapInPromise(Data.prototype._docsets);
};

Data.getActiveDocsets =function(){
    return this.wrapInPromise(Data.prototype._docsets);
};

Data.getTypes = function(docset){
    return this.wrapInPromise(Data.prototype._types);
};

Data.getReferences = function(docset, type, page){
    return this.wrapInPromise(Data.prototype._references);
};

Data.getReference = function(docset, uri){
    return this.wrapInPromise(Data.prototype._references[0]);
};

Data.searchReference = function(pattern, page){
    return this.wrapInPromise(Data.prototype._references);
};

Data.wrapInPromise = function(collection){
    return {
        then: function(fun){
            fun(collection);
            return {then: function(f){
                            f();
                            return {fail:function(){}};
                          },
                    fail: function(){}
                    };
            },
    };
};

module.exports = Data;
