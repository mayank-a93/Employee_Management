var appconfig = require('../config/appconfig.js');
var path = require('path');
var Cookies = require('cookies')
var jwt = require('jsonwebtoken');
var adminService = require('../js/admin.js')

var exports = module.exports = {}
exports.adminRouter = require('express').Router();

exports.adminRouter.use(function(req, res, next) {
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
					verification(decoded, res, req, next)
				}
			})
		} else {
			res.redirect("/adminLogin")
			res.end()
		}
	}
})

function verification(decoded, res, req, next) {
	if (decoded.Status == true) {
		if (decoded.Type == "Human Resource") {
			req.decoded = decoded
			next();
		} else {
			res.redirect("/adminLogin")
		}
	} else {
		res.json({
			success: false,
			message: 'Account is disabled'
		})
		res.end()
	}
}

exports.adminRouter.get('/', function(req, res) {
	console.log("sent back adminHome.html");
	res.sendFile(path.join(appconfig.views, 'adminHome.html'))
})

exports.adminRouter.post('/search', adminService.searchHandler)
exports.adminRouter.get('/getList', adminService.getListHandler);
exports.adminRouter.get('/:id', adminService.getUserHandler);