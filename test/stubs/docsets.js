var filters = require('../../app/filters');
var q = require('q');

function Docsets(){

}

Docsets.prototype.filter = function(field, operator, value) {
    Docsets.prototype._collection = Docsets.prototype._collection.filter(function(reference) {
        if (operator == filters.operators.EQUALS) {  
                return reference[field] == value;
        } else if (operator == filters.operators.IN && value) {
            if(field=='docset'){
                return value.indexOf(reference.docset.name) != -1;
            }else{
                return value.indexOf(reference[field]) != -1;
            }
        } else if(operator == filters.operators.CONTAINS){
            return reference[field].toLowerCase().indexOf(value.toLowerCase())!= -1;
        }
        return true;
    });
    return this;
};

Docsets.prototype.execute = function() {
    return q.fcall(function(){return Docsets.prototype._collection;});
};

Docsets.prototype.select = function() { return this; };
Docsets.prototype.order = function() { return this; };

module.exports=Docsets;

