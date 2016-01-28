var appconfig = require('../config/appconfig.js');
var path = require('path');
var Cookies = require('cookies')
var jwt = require('jsonwebtoken');

var exports = module.exports = {}
exports.privateRouter = require('express').Router();

exports.privateRouter.use(function(req, res, next) {
	if (!req.decoded) {
		var cookies = new Cookies(req, res)
		var token = cookies.get('auth_token')
		if (token) {
			jwt.verify(token, appconfig.secret, function(err, decoded) {
				if (err) {
					res.json({
						success: false,
						message: 'Authentication failed'
					})
					res.end()
				} else {
					req.decoded = decoded
					next()
				}
			})
		} else {
			res.json({
				success: false,
				message: 'Authentication failed'
			})
			res.end()
		}
	}
})

exports.privateRouter.get('/', function(req, res) {
	res.json(req.decoded);	
})
exports.privateRouter.get('/Admin', function(req, res) {
	res.json(req.decoded);	
})