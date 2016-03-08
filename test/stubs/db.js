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
            })
            .then(function(){
                return db.schema.hasTable('docsetsxuser');
            })
            .then(function(exists){
                if(exists)
                    return db('docsetsxuser').del();
                else
                    return db.schema.createTable('docsetsxuser', function(table){
                        table.uuid('id');
                        table.integer('user');
                        table.integer('docset');
                });
            })
            .then(function(){
                return db.schema.hasTable('docsets');
            })
            .then(function(exists){
                if(exists)
                    return db('docsets').del();
                else
                    return db.schema.createTable('docsets', function(table){
                        table.uuid('id');
                        table.integer('docset');
                        table.integer('default_uri');
                        table.integer('update_date');
                        table.integer('label');
                        table.integer('active');
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
