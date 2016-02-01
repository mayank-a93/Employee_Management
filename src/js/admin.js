var mongo = require('../config/dbconfig.js');
var DbFunctions = require('../dataStore/dbFunctions.js');

exports.getListHandler = function(req, res) {
	console.log('Got a request for employee list');
	DbFunctions.EmpListQuery(mongo.dbCon, res);
}

exports.searchHandler = function(req, res) {
	console.log('Got a request for search');
	var query = req.body.Name;
	DbFunctions.searchQuery(mongo.dbCon, query, res);
}

exports.getUserHandler = function(req, res) {
	console.log('Got a request for search user');
	var query = req.params.id;
	DbFunctions.getUserQuery(mongo.dbCon, query, res);
}