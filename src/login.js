var path = require('path');
var fs = require('fs');
var views = path.join(__dirname, 'views')

exports.loginHandler = function(req, res) {
	res.sendFile(path.join(views, 'login.html'))
}

exports.loginUserHandler = function(req, res) {
	console.log('Got a Login form!');
	fs.readFile(path.join(__dirname, 'data/users.json'), function(err, data) {
		if (err) {
			return console.error(err);
		} else {
			data = JSON.parse(data);
			if (data[req.body.uid] == undefined)
				console.log('No such userID');
			else if (data[req.body.uid].Password != req.body.pass)
				console.log("Passwords dont match");
			else
				console.log('successful login');
		}
	});
}