var filters = require('../app/filters');
var util = require('util');
var db = require('./db');

function References(){
    this._query = db('refs');
} 

References.prototype.filter = function(field, operator, value) {
    field = 'refs.' + field;
    if (operator == filters.operators.EQUALS) {
        this._query = this._query.where(field, value);
    }
    if (operator == filters.operators.IN && value) {
        this._query = this._query.whereIn(field, value);
    }
    if (operator == filters.operators.CONTAINS && value){
        this._query = this._query.where(field, 'ilike', value+'%')
            .orWhere(field, 'ilike', '%'+value+'%')
            .orWhere(field, 'ilike', '%'+value)
            .orderByRaw("refs.reference ilike '"+value+"%' desc")
            .orderByRaw("refs.reference ilike '%"+value+"%' desc")
            .orderByRaw("refs.reference ilike '%"+value+"' desc");
    }
    return this;
};

References.prototype.docsetstatefilter = function(value){
    this._query = this._query.innerJoin('docsets', 'refs.docset', 'docsets.docset')
        .where('docsets.active', filters.operators.IN , value);
    return this;
};


References.prototype.select = function(columns){
    var ren_columns = columns.map(function(column) {
        return 'refs.' + column;
    });
    this._query = this._query.select(ren_columns);
    return this;
};

References.prototype.distinct = function(column){
    this._query = this._query.distinct(column);
    return this;
};

References.prototype.page = function(number, pagesize){
    this._query = this._query.limit(pagesize).offset((number-1)*pagesize).orderBy('refs.reference', 'ASC');
    return this;
};

References.prototype.count = function(){
    return this._query.count('refs.id')
        .then(function(res){
            this.query = db('refs');
            return parseInt(res[0].count);
        }.bind(this),function(err){
            return err;
        });
};

References.prototype.execute = function() {
    return this._query.then(
        function(rows){
            this._query = db('refs');
            return rows;
        }.bind(this),
        function(err){
            return err;
        });
};

module.exports = References;
