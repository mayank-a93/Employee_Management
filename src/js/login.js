var path = require('path');
var Cookies = require('cookies')
var jwt = require('jsonwebtoken');
var appconfig = require('../config/appconfig.js');
var mongo = require('../config/dbconfig.js');
var DbFunctions = require('../dataStore/dbFunctions.js');
var cookies;

exports.loginHandler = function(req, res) {
	res.sendFile(path.join(appconfig.views, 'login.html'))
}

exports.loginUserHandler = function(req, res) {
	console.log('Got a Login form!');
	var user = {
		email: req.body.email,
		password: req.body.pass
	};
	cookies = new Cookies(req, res);
	DbFunctions.loginQuery(mongo.dbCon, user, res, Authenticate);
}

exports.loginAdminHandler = function(req, res) {
	console.log('Got a Admin Login form!');
	var user = {
		email: req.body.email,
		password: req.body.pass
	};
	cookies = new Cookies(req, res);
	DbFunctions.loginAdminQuery(mongo.dbCon, user, res, AuthenticateAdmin);
}

function Authenticate(isSuccess, res, result) {
	if (isSuccess) {
		console.log("success");
		result.Password = null;
		var token = jwt.sign(result, appconfig.secret, {
			expiresIn: 300 // expires in 5 mins
		});
		cookies.set('auth_token', token);
		res.redirect('/user/');
	} else {
		console.log("Incorrect Username or Password");
	}
}

function AuthenticateAdmin(isSuccess, res, result) {
	if (isSuccess) {
		console.log("success");
		result.Password = null;
		var token = jwt.sign(result, appconfig.secret, {
			expiresIn: 300 // expires in 5 mins
		});
		cookies.set('auth_token', token);
		res.redirect('/admin/');
	} else {
		console.log("Incorrect Username or Password");
	}
}