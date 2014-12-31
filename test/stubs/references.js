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

Docsets.prototype.docsetstatefilter = function(value){
    Docsets.prototype._collection = Docsets.prototype._collection.filter(function(reference) {
        return reference.docset.active==value;
    });
    return this;

}
Docsets.prototype.select = function(columns){
	Docsets.prototype._collection = Docsets.prototype._collection.map(function(reference){
		var projection={};
		columns.map(function(column){
			projection[column]=reference[column];
		});
		return projection;
	});
	return this;
};

Docsets.prototype.execute = function() {
    return q.fcall(function(){return Docsets.prototype._collection;});
};

Docsets.prototype.addRefsRange = function(refs){
    Docsets.prototype._collection=Docsets.prototype._collection.concat(refs);
    return this;
};

module.exports=Docsets;
