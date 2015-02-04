var filters = require('../../app/filters');
var q = require('q');

function References(){

}

References.prototype.filter = function(field, operator, value) {
    References.prototype._collection = References.prototype._collection.filter(function(reference) {
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

References.prototype.docsetstatefilter = function(value){
    References.prototype._collection = References.prototype._collection.filter(function(reference) {
        return reference.docset.active==value;
    });
    return this;

};

References.prototype.select = function(columns){
	References.prototype._collection = References.prototype._collection.map(function(reference){
		var projection={};
		columns.map(function(column){
			projection[column]=reference[column];
		});
		return projection;
	});
	return this;
};

References.prototype.execute = function() {
    return q.fcall(function(){return References.prototype._collection;});
};

References.prototype.addRefsRange = function(refs){
    References.prototype._collection=References.prototype._collection.concat(refs);
    return this;
};

References.prototype.page = function(number, size){
    References.prototype._collection=References.prototype._collection.slice((number-1)*size, number*size);
    return this;
};

References.prototype.count = function(){
    return q.fcall(function(){return References.prototype._collection.length;});
};
module.exports=References;
