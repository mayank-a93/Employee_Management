var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var appconfig = require('./config.js');
var routes = require('./routes.js');


app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes.publicRouter);

app.set('superSecret', appconfig.secret);

var server = app.listen(8081, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('My server is listening at http://%s:%s', host, port);
})