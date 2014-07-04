var filters = require('../app/filters');
var util = require('util');

var knex = require('knex')({
    client: 'postgres',
    connection: {
        host     : '127.0.0.1',
        user     : 'postgres',
        database : 'slashdb'
    }
});

function Docsets(){
    this._query = knex('refs');
} 

Docsets.prototype.filter = function(field, operator, value) {
    if (operator == filters.operators.EQUALS) {
        this._query = this._query.where(field, value);
    }
    if (operator == filters.operators.IN && value) {
        this._query = this._query.whereIn(field, value);
    }
    return this;
};

Docsets.prototype.select = function(columns){
    this._query = this._query.select(columns);
    return this;
}

Docsets.prototype.execute = function() {
    return this._query.then(
        function(rows){
            this._query = knex('refs');
            return rows;
        }.bind(this), 
        function(err){
            return err;
        });
};

Docsets.prototype.addRefsRange = function(refs) {
    var query='';
    refs.forEach(function(ref){
        query+=util.format("\n\
UPDATE refs SET content=$$%s$$ WHERE reference=$$%s$$ and type=$$%s$$ and docset=$$%s$$;\
INSERT INTO refs ( reference, type, docset, content, parent_id)\
SELECT $$%s$$, $$%s$$, $$%s$$, $$%s$$, (SELECT id FROM refs WHERE reference=$$%s$$ and type=$$%s$$ and docset=$$%s$$)\
WHERE NOT EXISTS (SELECT 1 FROM refs WHERE reference=$$%s$$ and type=$$%s$$ and docset=$$%s$$);\
        ", ref.content, ref.reference, ref.type, ref.docset, 
        ref.reference, ref.type,ref.docset,ref.content, 
        !ref.parent || ref.parent.reference, !ref.parent || ref.parent.type, !ref.parent || ref.parent.docset,
        ref.reference, ref.type, ref.docset);
    });
    this._query = knex.raw(query);
    return this;
};

module.exports = Docsets; 