var path = require('path');
var fs = require('fs');
var appconfig = require('../config/appconfig.js');
var mongo = require('../config/dbconfig.js');
var AccountDbFunctions = require('../dataStore/dbFunctions.js');

exports.registerHandler = function(req, res) {
	res.sendFile(path.join(appconfig.views, 'register.html'))
}

exports.registerUserHandler = function(req, res) {
	console.log('Got a registeration form!');
	var user = {
		Name: req.body.nam,
		Type: req.body.typ,
		Phone: req.body.phno,
		Email: req.body.email,
		Password: req.body.pass,
		Status: true,
		Remarks: []
	};
	/*collection.insert(user);*/

	AccountDbFunctions.registerUserQuery(mongo.dbCon, user, res, callback)

	function callback(isSuccess, res, err) {
		if (isSuccess) {
			console.log('User registration successfull');
		} else {
			if (err.code == 11000) {
				console.log("Email already in use");
			} else {
				console.log(err.code);
			}
		}
	}
}