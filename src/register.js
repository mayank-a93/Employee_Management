var path = require('path');
var fs = require('fs');
var views = path.join(__dirname, 'views')

exports.registerHandler = function(req, res) {
	res.sendFile(path.join(views, 'register.html'))
}

exports.registerUserHandler = function(req, res) {
	console.log('Got a registeration form!');
	var user = {
		'Name': req.body.nam,
		'Phone': req.body.phno,
		'Type': req.body.typ,
		'Password': req.body.pass
	};
	var users = {};
	fs.readFile(path.join(__dirname, 'data/users.json'), function(err, data) {
		if (err)
			return console.error(err);
		users = JSON.parse(data);
		if (users[req.body.uid] == undefined) {
			console.log('User does not exist');
			users[req.body.uid] = user;
			console.log(JSON.stringify(users, null, 4));
			fs.writeFile(path.join(__dirname, 'data/users.json'), JSON.stringify(users, null, 4), function(err) {
				return console.error(err);
			})
		} else {
			res.send('User already exists.')
		}
		console.log('Successfully registered');
		res.redirect('/login');
	});
}