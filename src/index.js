var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var getPage = require('./js/getPage.js')
var app = express();
var views = path.join(__dirname, 'views')


app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
	console.log('Welcome to Employee Mgmt System');
	res.sendFile(path.join(views, 'index.html'))
})

app.get('/login', function(req, res) {
	console.log('Got a GET request for LoginPage');
	res.sendFile(path.join(views, 'login.html'))
})

app.post('/loginUser', function(req, res) {
	console.log('Got a Login form!');
	console.log(req.body.uid);
	console.log(req.body.pass);
})

app.get('/register', function(req, res) {
	console.log('Got a GET request for RegisterPage');
	res.sendFile(path.join(views, 'register.html'))
})

app.post('/registerUser', function(req, res) {
	console.log('Got a registeration form!');
	var user = {
		'Name': req.body.nam,
		'Phone': req.body.phno,
		'Type': req.body.typ,
		'UID': req.body.uid,
		'Password': req.body.pass
	};
	var users = {};
	fs.readFile(path.join(__dirname, 'data/users.json'), function(err, data) {
		if (err)
			return console.error(err);
		users = JSON.parse(data);
		console.log(JSON.stringify(users, null, 4));
		var len = Object.keys(users).length;
		console.log("Length : %s", len);
		users[(len + 1)] = user;
		console.log(JSON.stringify(users, null, 4));
		fs.writeFile(path.join(__dirname, 'data/users.json'), JSON.stringify(users, null, 4), function(err) {
			return console.error(err);
		})
	});
})


var server = app.listen(8081, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('My server is listening at http://%s:%s', host, port);
})