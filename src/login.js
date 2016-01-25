var path = require('path');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var appconfig = require('./config.js');


exports.loginHandler = function(req, res) {
	res.sendFile(path.join(appconfig.views, 'login.html'))
}

exports.loginUserHandler = function(req, res) {
	console.log('Got a Login form!');
	//cookies = new Cookies(request, response)
	var credentials = {
		username: req.body.uid,
		password: req.body.pass
	};
	Authenticate(credentials);
}

function Authenticate(credentials) {
	fs.readFile(path.join(__dirname, 'data/users.json'), function(err, data) {
		if (err) {
			return console.error(err);
		} else {
			data = JSON.parse(data);
			if (data[credentials.username] == undefined)
				console.log('No such userID');
			else if (data[credentials.username].Password != credentials.password)
				console.log("Passwords dont match");
			else
				console.log('successful login');
		}
	});
}