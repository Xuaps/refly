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
Data.getSingleDocset = function(docset){
    return this.wrapInPromise(Data.prototype._docsets);
};
Data.getReferences = function(docset, type, page){
    return this.wrapInPromise(Data.prototype._references);
};

Data.getReference = function(docset, uri){
    return this.wrapInPromise(Data.prototype._references[0]);
};

Data.searchReference = function(pattern, page, docsets){
    return this.wrapInPromise(Data.prototype._references);
};

Data.getCurrentUser = function(){
    return this.wrapInPromise(Data.prototype._users[0]);
};

Data.getUserDocsets = function(){
    return this.wrapInPromise(Data.prototype._userDocsets);
};

Data.setUserDocsets = function(name, email, message){
    return this.wrapInPromise({message: "Selection saved"});
};

Data.mailSending = function(docsets){
    return this.wrapInPromise({"message":"message sent"});
};

Data.wrapInPromise = function(collection){
    if(collection && collection.then)
        return collection;

    return {
        then: function(fun){
            return Data.wrapInPromise(fun(collection));
        },
        fail: function(){
            return {fail:function(){}, done: function(){}};
          },
        catch: function(){
            return {fail:function(){}, done: function(){}};
          },
        done: function(){}
    };
};

module.exports = Data;
