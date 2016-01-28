var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('./config/dbconfig.js')
var appconfig = require('./config/appconfig.js');
var routes = require('./routes/routes.js');
var privateRoutes = require('./routes/privateRoutes.js');


mongo.connectToDb(callback);
app.use(express.static(path.join(__dirname, 'public')));
app.set('superSecret', appconfig.secret);
app.use(bodyParser.urlencoded({
	extended: false
}));


app.use('/home', privateRoutes.privateRouter);
app.use('/', routes.publicRouter);

function callback(isSuccess) {
	if (isSuccess) {
		var server = app.listen(8081, function() {
			var host = server.address().address;
			var port = server.address().port;

			console.log('My server is listening at http://%s:%s', host, port);
		});
	} else {
		console.log("Db connection failed")
	}
}