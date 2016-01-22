var registerService = require('./register.js')
var loginService = require('./login.js')

var exports = module.exports = {}

exports.publicRouter = require('express').Router();
exports.publicRouter.get('/login', loginService.loginHandler);
exports.publicRouter.post('/loginUser', loginService.loginUserHandler);
exports.publicRouter.get('/register', registerService.registerHandler);
exports.publicRouter.post('/registerUser', registerService.registerUserHandler);