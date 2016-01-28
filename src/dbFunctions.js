exports.registerUserQuery = function(db, user, response, callback) {
	var collection = db.collection('Users')
	collection.insert(user, function(err, docs) {
		if (err) {
			return callback(false, response, err)
		} else {
			return callback(true, response, err)
		}
	});
}

exports.loginQuery = function(db, credentials, callback, response) {
	var collection = db.collection('UserCollection')
	collection.findOne({"emailId": credentials.username,"password":credentials.password},{},function(err, result) {
		if (err) {
			callback(false, response);
			}
			callback(true, response,result);
	});
}