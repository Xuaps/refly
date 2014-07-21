var knex = require('knex');

if(!global.db){
	global.db = knex({
	    client: 'postgres',
	    connection: {
	        host     : '127.0.0.1',
	        user     : 'postgres',
	        database : 'slashdb'
	    }
	});
}

module.exports = global.db;
