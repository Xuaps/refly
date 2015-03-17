var Data = function(){};

Data.getDefaultDocsets = function(){
    return wrapInPromise(Data.prototype._docsets);
};

Data.getActiveDocsets =function(){
    return wrapInPromise(Data.prototype._docsets);
};

Data.getTypes = function(docset){
    return wrapInPromise(Data.prototype._types);
};

Data.getReferences = function(docset, type, page){
    return wrapInPromise(Data.prototype._references);
};

Data.getWorkingDocsets = jest.genMockFunction();

Data.setWorkingDocsets = jest.genMockFunction();

var wrapInPromise = function(collection){
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
