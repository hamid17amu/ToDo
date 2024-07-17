const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  port:'3306',
  user: 'root',
  password: '',
  database: 'todolist'
});
 
db.connect((err)=> {
  if (err) console.log(err);
 
  console.log('connected to DB');
});

module.exports=db;