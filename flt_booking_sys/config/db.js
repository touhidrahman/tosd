var mysql      = require('mysql');
var dbconfig   = require('../knexfile.js');
var connection = mysql.createConnection({
  host     : dbconfig.connection.host,
  user     : dbconfig.connection.user,
  password : dbconfig.connection.password,
  database : dbconfig.connection.database
});
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'test'
// });

connection.connect(function(err) {
  if (err) {
    console.error('MySQL error connecting: ' + err.stack);
    return;
  }
 
  console.log('MYSQL connected as id ' + connection.threadId);
});

module.exports = connection;