var fs = require('fs');
var path = require('path');

exports.getp = function(dir,name) {
	console.log(path.join(dir,name));
	fs.readFile(path.join(dir,name), 'utf-8', function(err, data) {
		if (err) {
			console.log(err.stack);
			throw err;
		}
		return data;
	})
}