var filters = require('../../app/filters');

function Docsets(){
    this._collection = Docsets.prototype._collection;
}

Docsets.prototype.filter = function(field, operator, value) {
    this._collection = this._collection.filter(function(reference) {
        if (operator == filters.operators.EQUALS) {
            return reference[field] == value;
        } else if (operator == filters.operators.IN) {
            return value.indexOf(reference[field]) != -1;
        }
    });
    return this;
};

Docsets.prototype.select = function(columns){
	this._collection = this._collection.map(function(reference){
		var projection={};
		columns.map(function(column){
			projection[column]=reference[column];
		});
		return projection;
	});
	return this;
};

Docsets.prototype.then = function(callback) {
    callback(this._collection);
};

Docsets.prototype.add = function(docset){
    this._collection.push(docset);
}

module.exports=Docsets;
