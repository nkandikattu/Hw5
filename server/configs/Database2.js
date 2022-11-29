const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hw5DB'
})


function addUser(firstname, lastname, emailid, password){
    const result = db.query(`
    INSERT INTO User(firstname, lastname, email, password) VALUES(?,?,?,?)
    `, [firstname, lastname, emailid, password])
    return result;
  }

exports.addUser = addUser;