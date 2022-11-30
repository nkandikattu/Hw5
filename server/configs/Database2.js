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


function getUserPassword(email){
    var result;
    db.query(`SELECT * FROM User where email=?;`, [email],(err, res)=>{
        if(err){
            console.log(err);
        }
        else{
            if(res.length > 0 ){
                console.log(res[0], "lenght is big")
                if(res[0].password ==  password){
                    result = "login success";
                }
                else{
                    result = "login failed";
                }
            }
        }
    })
    //console.log(result);
    return result;
}

exports.addUser = addUser;
exports.getUserPassword = getUserPassword;