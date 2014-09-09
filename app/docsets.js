var filters = require('../app/filters');
var util = require('util');
var db = require('./db');

function Docsets(){
    this._query = db('refs');
} 

Docsets.prototype.filter = function(field, operator, value) {
    if (operator == filters.operators.EQUALS) {
        this._query = this._query.where(field, value);
    }
    if (operator == filters.operators.IN && value) {
        this._query = this._query.whereIn(field, value);
    }
    if (operator == filters.operators.CONTAINS && value){
        this._query = this._query.where(field, 'ilike', '%'+value+'%');
    }
    return this;
};

Docsets.prototype.select = function(columns){
    this._query = this._query.select(columns);
    return this;
}

Docsets.prototype.distinct = function(column){
    this._query = this._query.distinct(column);
    return this;
}

Docsets.prototype.execute = function() {
    return this._query.then(
        function(rows){
            this._query = db('refs');
            return rows;
        }.bind(this), 
        function(err){
            return err;
        });
};

Docsets.prototype.addRefsRange = function(refs) {
    var query='';
    refs.forEach(function(ref){
            var where=ref.parent?
                util.format("WHERE reference=$slash$%s$slash$ and type=$slash$%s$slash$ and docset=$slash$%s$slash$ and parent_id=(SELECT id FROM refs where uri=$slash$%s$slash$)",
                     ref.reference, ref.type,ref.docset,ref.parent)
                : util.format("WHERE reference=$slash$%s$slash$ and type=$slash$%s$slash$ and docset=$slash$%s$slash$ and parent_id is null",
                     ref.reference, ref.type,ref.docset)
            query+=util.format("\n\
                    UPDATE refs SET content=$slash$%s$slash$, uri=$slash$%s$slash$ "+where+";\
                    INSERT INTO refs ( reference, type, docset, content, uri, parent_id)\
                    SELECT $slash$%s$slash$, $slash$%s$slash$, $slash$%s$slash$, $slash$%s$slash$, $slash$%s$slash$,(SELECT id FROM refs WHERE uri=$slash$%s$slash$)\
                    WHERE NOT EXISTS (SELECT 1 FROM refs "+where+");"
                    ,ref.content, ref.uri,ref.reference, ref.type,ref.docset,ref.content, ref.uri, ref.parent);
        });
    this._query = db.raw(query);
    return this;
};

module.exports = Docsets; 
