var knex = require('knex');

var db = knex(
    {
        client: 'sqlite3',
        connection: {
            filename: ':memory:'
        }
    });
db.mock = {
    init: function(){
        return db.schema
            .hasTable('users')
            .then(function(exists){
               if(exists) 
                    return db('users').del();
               else
                    return db.schema.createTable('users', function (table) {
                      table.increments('id');
                      table.integer('profile_id');
                      table.string('profile_provider');
                      table.string('auth_token');
                      table.string('email');
                    });
            })
            .then(function(){
                return db.schema.hasTable('clients');
            })
            .then(function(exists){
                if(exists)
                    return db('clients').del();
                else
                    return db.schema.createTable('clients', function(table){
                        table.uuid('id');
                        table.integer('user_id');
                    });
            });
    },

    tableInitialvalue: function(table, values){
        return db(table)
            .del()
            .then(
                    function(){
                        return db.insert(values).into(table);
                    });
    }
};

module.exports = db;
