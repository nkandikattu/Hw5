const mysql = require('mysql')
const mysql2 = require('mysql2/promise')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hw5DB',
    port: 8889
})
const db2 = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hw5DB',
    port: 8889
})


function addUser(firstname, lastname, emailid, password){
    const result = db.query(`
    INSERT INTO User(firstname, lastname, email, password) VALUES(?,?,?,?)
    `, [firstname, lastname, emailid, password])
    return result;
  }

  function addQuizAnswers(email, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10){
    const result = db.query(`
    INSERT INTO QuizAnswer(user_id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10) 
    VALUES((SELECT id from User where email=? limit 1),?,?,?,?,?,?,?,?,?,?)
    `, [email, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10])

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
                console.log(res[0], "length is big")
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
exports.updateUserVector = async(current_user_id, q)=>{
    var sql = `UPDATE QuizAnswer
    SET q1 = ${q[0]}, q2 = ${q[1]}, q3 = ${q[2]}, q4 = ${q[3]}, q5 = ${q[4]}, q6 = ${q[5]}, q7 = ${q[6]},
    q8 = ${q[7]}, q9 = ${q[8]},q10 = ${q[9]}
    WHERE user_id = ${current_user_id}`;
    const [users,fields] =  await db2.execute(sql);
    return users[0];
}
exports.resetUser = async(current_user_id) =>{
    var sql = `DELETE FROM UsersViewed WHERE primary_user_id=${current_user_id}`;
    const [users,fields] =  await db2.execute(sql);
    return users[0];
}

exports.getUserVector = async(current_user_id) =>{
    var sql = `Select * from QuizAnswer where user_id=${current_user_id}`;
    const [users,fields] =  await db2.execute(sql);
    return users[0];
}

exports.getUser= async(current_user_id)=>{
    var sql=`Select * from User where id=${current_user_id}`;
    const [user,fields] =await db2.execute(sql);
    return user;
}

exports.getMatchedUsers = async(current_user_id, res, next) =>{
    var sql = 'SELECT secondary_user_id FROM UsersViewed WHERE primary_user_id=?'
    const [users,fields] =  await db2.execute(sql, [current_user_id]) //, (err, res,fields) => {
    return users;
}
exports.addUserMatch = async(current_user_id, match_user_id)=>{
    var sql = `INSERT INTO UsersViewed(primary_user_id, secondary_user_id) VALUES(${current_user_id},${match_user_id})`;
    const [users,fields] = await db2.execute(sql)
    return users;
}

exports.getOtherUsers = async(user_list, current_user_id)=>{
    console.log(user_list);
    console.log(typeof(user_list))
    var filterList=[];
    user_list.forEach(element => {
        filterList.push(element.secondary_user_id)
    });
    filterList.push(Number(current_user_id))
    console.log(filterList);
    // get potential users to match -> userId, email and quiz answers
    var queryString = `SELECT User.id, QuizAnswer.user_id, QuizAnswer.q1, QuizAnswer.q2, QuizAnswer.q3, QuizAnswer.q4, ` + 
    `QuizAnswer.q5, QuizAnswer.q6, QuizAnswer.q7, QuizAnswer.q8, QuizAnswer.q9, QuizAnswer.q10` +
     ` FROM User INNER JOIN QuizAnswer ON User.id=QuizAnswer.user_id AND QuizAnswer.user_id NOT IN (${filterList})`
    
    const [users,fields] = await db2.execute(queryString) //, (err,res)=>{
    return users;
}

exports.addUser = addUser;
exports.getUserPassword = getUserPassword;
exports.addQuizAnswers = addQuizAnswers;