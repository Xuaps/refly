var config = require('config');
var knex = require('knex');
if(!global.db){
	global.db = knex(config.dbConfig);
}

module.exports = global.db;
		
