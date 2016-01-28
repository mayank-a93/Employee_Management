var path = require('path');
var appconfig = require('./appconfig.js');
var mongo = require('mongodb').MongoClient;
var collection;
var dbUrl = appconfig.dbConnectionUrl;
var exports = module.exports = {}
exports.connectToDb = function(callback) {
	mongo.connect(dbUrl, function(err, db) {
		if (err) {
			callback(false);
		} else {
			console.log("DB Connection Established.");
			exports.dbCon = db;
			callback(true);
		}
	});
}