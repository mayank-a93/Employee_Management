var path = require('path');
var fs = require('fs');
var appconfig = require('../config.js');
var MongoClient = require('mongodb').MongoClient;
var collection;
// Connection
MongoClient.connect("mongodb://localhost:27017/EmpDB", function(err, db) {
	if (err) {
		return console.dir(err);
	}
	collection = db.collection('testc');

});

exports.registerHandler = function(req, res) {
	res.sendFile(path.join(appconfig.views, 'register.html'))
}

exports.registerUserHandler = function(req, res) {
	console.log('Got a registeration form!');
	var user = {
		'Name': req.body.nam,
		'Type': req.body.typ,
		'Phone': req.body.phno,
		'Password': req.body.pass,
		'Remarks': [],
		'Status': "Actve"
	};

	collection.insert(user);



	/*var users = {};
	fs.readFile(appconfig.jsonFile, function(err, data) {
		if (err)
			return console.error(err);
		users = JSON.parse(data);
		if (users[req.body.uid] == undefined) {
			console.log('User does not exist');
			users[req.body.uid] = user;
			console.log(JSON.stringify(users, null, 4));
			fs.writeFile(appconfig.jsonFile, JSON.stringify(users, null, 4), function(err) {
				return console.error(err);
			})
		} else {
			res.send('User already exists.')
		}
		console.log('Successfully registered');
		res.redirect('/login');
	});*/
}