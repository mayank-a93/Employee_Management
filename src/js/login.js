var path = require('path');
var fs = require('fs');
var Cookies = require('cookies')
var jwt = require('jsonwebtoken');
var appconfig = require('../config/appconfig.js');


exports.loginHandler = function(req, res) {
	res.sendFile(path.join(appconfig.views, 'login.html'))
}

exports.loginUserHandler = function(req, res) {
	console.log('Got a Login form!');
	cookies = new Cookies(req, res)
	var user = {
		username: req.body.uid,
		password: req.body.pass
	};
	Authenticate(user, res);
}

exports.loginAdminHandler = function(req, res) {
	console.log('Got a Admin Login form!');
	cookies = new Cookies(req, res)
	var user = {
		username: req.body.uid,
		password: req.body.pass
	};
	AuthenticateAdmin(user, res);
}

function Authenticate(user, res) {
	fs.readFile(appconfig.jsonFile, function(err, data) {
		if (err) {
			return console.error(err);
		} else {
			data = JSON.parse(data);
			if (data[user.username] == undefined)
				console.log('No such userID');
			else if (data[user.username].Password != user.password)
				console.log("Passwords dont match");
			else {
				console.log('successful login');
				data[user.username].Password = null;
				var token = jwt.sign(data[user.username], appconfig.secret, {
					expiresIn: 3600 // expires in 1 hour
				});
				cookies.set('auth_token', token);				
				res.redirect('/home');
			}
		}
	});
}

function AuthenticateAdmin(user, res) {
	fs.readFile(appconfig.jsonFile, function(err, data) {
		if (err) {
			return console.error(err);
		} else {
			data = JSON.parse(data);
			if (data[user.username] == undefined)
				console.log('No such userID');
			else if (data[user.username].Type != "Human Resource")
				console.log("User is not Admin.");
			else if (data[user.username].Password != user.password)
				console.log("Passwords dont match");
			else {
				console.log('successful login');
				data[user.username].Password = null;
				var token = jwt.sign(data[user.username], appconfig.secret, {
					expiresIn: 3600 // expires in 1 hour
				});
				cookies.set('auth_token', token);				
				res.send(JSON.stringify(data,null,4))
			}
		}
	});
}