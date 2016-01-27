var path = require('path');

var appconfig = {};
appconfig.views = path.join(__dirname, 'views')
appconfig.jsonFile = path.join(__dirname, 'data/users.json')
appconfig.secret='WorshipTheDevil';
//appConfig.dbConnectionUrl='mongodb://localhost:27017/EmpDB';
module.exports=appconfig;