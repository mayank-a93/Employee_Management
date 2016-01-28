var registerService = require('../js/register.js')
var loginService = require('../js/login.js')
var appconfig = require('../config/appconfig.js');
var path = require('path');

var exports = module.exports = {}

exports.publicRouter = require('express').Router();
exports.publicRouter.get('/', function(req, res) {
	res.sendFile(path.join(appconfig.views, 'index.html'))
});
exports.publicRouter.get('/admin', function(req, res) {
	res.sendFile(path.join(appconfig.views, 'adminLogin.html'))
});
exports.publicRouter.post('/loginAdmin', loginService.loginAdminHandler);
exports.publicRouter.get('/login', loginService.loginHandler);
exports.publicRouter.post('/loginUser', loginService.loginUserHandler);
exports.publicRouter.get('/register', registerService.registerHandler);
exports.publicRouter.post('/registerUser', registerService.registerUserHandler);