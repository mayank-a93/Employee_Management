var bcrypt = require('bcryptjs');
var mongo = require('mongodb');

exports.registerQuery = function(db, user, res, callback) {
	var collection = db.collection('Users')
	collection.insert(user, function(err, docs) {
		if (err) {
			return callback(false, res, err)
		} else {
			return callback(true, res, err)
		}
	});
}

exports.loginQuery = function(db, user, res, Authenticate) {
	var collection = db.collection('Users')
	collection.findOne({
		"Email": user.email
	}, {}, function(err, result) {
		if (err) {
			Authenticate(false, res);
		}
		if (bcrypt.compareSync(user.password, result.Password)) {
			Authenticate(true, res, result);
		} else {
			Authenticate(false, res);
		}
	});
}

exports.loginAdminQuery = function(db, user, res, Authenticate) {
	var collection = db.collection('Users')
	collection.findOne({
		"Email": user.email,
		"Type": "Human Resource"
	}, {}, function(err, result) {
		if (err) {
			Authenticate(false, res);
		}
		console.log(user.email);
		if (bcrypt.compareSync(user.password, result.Password)) {
			Authenticate(true, res, result);
		} else {
			Authenticate(false, res);
		}
	});
}

exports.EmpListQuery = function(db, res) {
	var collection = db.collection('Users')
	collection.find({}, {
		"Name": 1
	}).toArray(function(err, result) {
		if (err) {
			console.log(err);
		}
		res.send(result);
	})
}

exports.searchQuery = function(db, query, res) {
	var collection = db.collection('Users')	
	collection.find({
		"Name": new RegExp(query, 'i')
	}, {
		"Name": 1
	}).toArray(function(err, result) {
		if (err) {
			console.log(err);
		}
		console.log(result);
		res.send(result);
	})
}

exports.getUserQuery = function(db, query, res) {
	var collection = db.collection('Users')    
	var o_id = new mongo.ObjectID(query);
	collection.find({
		"_id": o_id
	}, {"Password": 0}).toArray(function(err, result) {
		if (err) {
			console.log(err);
		}
		console.log(result);
		res.send(result);
	})
}

exports.addRemarkQuery = function(db, query, res){
	var collection = db.collection('Users')    
	var o_id = new mongo.ObjectID(query.id);
	collection.update({
		"_id": o_id
	}, {
		$push: {
			"Remark": query.msg,
			"Timestamp": query.timestamp,
		}
	},function(err){
		if(err)
			console.log(err);
	})
}