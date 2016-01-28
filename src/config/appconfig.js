var path = require('path');

var appconfig = {};
appconfig.views = path.join(process.cwd(), 'views')
appconfig.secret = 'WorshipTheDevil';
appconfig.dbConnectionUrl = 'mongodb://localhost:27017/EmpDB';
module.exports = appconfig;