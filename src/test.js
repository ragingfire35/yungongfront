var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'huowei',
  password : 'huowei2008',
  database : 'huowei2008'
});

connection.connect();
/*connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  //if (error) {throw error;}
  console.log('The solution is: ', results[0].solution);
});*/
console.log(1)