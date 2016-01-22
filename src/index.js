var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var getPage = require('./js/getPage.js')
var app = express();
var views = path.join(__dirname, 'views')
var routes = require('./routes.js');


app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes.publicRouter);


var server = app.listen(8081, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log('My server is listening at http://%s:%s', host, port);
})