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
})


var server = app.listen(8081, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('My server is listening at http://%s:%s', host, port);
})