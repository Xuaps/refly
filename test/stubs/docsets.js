var filters = require('../../app/filters');

function Docsets(){

}

Docsets.prototype.filter = function(field, operator, value) {
    Docsets.prototype._collection = Docsets.prototype._collection.filter(function(reference) {
        if (operator == filters.operators.EQUALS) {
            return reference[field] == value;
        } else if (operator == filters.operators.IN) {
            return value.indexOf(reference[field]) != -1;
        }
    });
    return this;
};

Docsets.prototype.select = function(columns){
	Docsets.prototype._collection =Docsets.prototype._collection.map(function(reference){
		var projection={};
		columns.map(function(column){
			projection[column]=reference[column];
		});
		return projection;
	});
	return this;
};

Docsets.prototype.then = function(callback) {
    callback(Docsets.prototype._collection);
};

Docsets.prototype.addRefsRange = function(refs){
    Docsets.prototype._collection=Docsets.prototype._collection.concat(refs);
    return this;
}

module.exports=Docsets;
