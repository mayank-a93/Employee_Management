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
				if (err) {					//token verification failed
					res.json({
						success: false,
						message: 'Authentication failed'
					})
					res.end()
				} else {					//token is verified
					if (decoded.Status == true) {
						req.decoded = decoded
						next()
					} else {				//account is disabled
						res.json({
							success: false,
							message: 'Account is disabled'
						})
					}

				}
			})
		} else {						//No token
			res.redirect("/Login")
			res.end()			
		}
	}
})

exports.privateRouter.get('/', function(req, res) {
	res.json(req.decoded);
})