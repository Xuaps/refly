var filters = require('../app/filters');
var util = require('util');
var db = require('./db');

function References(){
    this._query = this._initializeQuery();
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
        this._query = this._query.where(function(){
            this.where(field, 'ilike', value+'%')
            .orWhere(field, 'ilike', '%'+value+'%')
            .orWhere(field, 'ilike', '%'+value)})
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
    this._query = this._query.select(columns.map(function(col){
        return col==='content'? 'refs_content.'+col:'refs.'+col}));
    return this;
};

References.prototype.distinct = function(column){
    this._query = this._query.distinct(column);
    return this;
};

References.prototype.page = function(number, pagesize){
    this._query = this._query.limit(pagesize).offset((number-1)*pagesize).orderBy('refs.reference', 'ASC').orderBy('refs.id', 'ASC');
    return this;
};

References.prototype.count = function(alias){
    this._query = this._query.select(db.raw('count(*) OVER() as '+alias));
    return this;
};

References.prototype.execute = function() {
    return this._query.then(
        function(rows){
            this._query = this._initializeQuery();
            return rows;
        }.bind(this),
        function(err){
            return err;
        });
};

References.prototype._initializeQuery = function(){
    return db('refs').innerJoin('refs_content', 'refs_content.source_url', 'refs.source_url');
};
module.exports = References;
