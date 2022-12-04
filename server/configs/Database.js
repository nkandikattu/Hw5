var config = require('./Config.js');
const mysql2 = require('mysql2/promise')

const db = mysql2.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.db,
    port: config.dbPort
})

exports.getTotalUserCount = async()=>{
    const sql = "select count(*) from User"
    const [user, fields] = await db.execute(sql);
    return user[0]['count(*)'];
}

exports.addUser = async(firstname, lastname, emailid, password)=>{
    console.log("in add user")
    const sql = `insert into User(firstname, lastname, email, password) values("${firstname}", "${lastname}", "${emailid}", "${password}")`;
    const [user, fields] = await db.execute(sql);
    return user;
}

exports.addQuizAnswers= async(email, q1, q2, q3,q4, q5, q6, q7, q8, q9, q10)=>{
    const sql = `insert into QuizAnswer(user_id, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
    values((select id from user where email="${email}" limit 1), ${q1}, ${q2}, ${q3}, ${q4}, ${q5},
    ${q6}, ${q7}, ${q8}, ${q9}, ${q10})`
    const [quiz, fields] = await db.execute(sql);
    return quiz
}
exports.updateUserVector = async(current_user_id, q)=>{
    var sql = `UPDATE QuizAnswer
    SET q1 = ${q[0]}, q2 = ${q[1]}, q3 = ${q[2]}, q4 = ${q[3]}, q5 = ${q[4]}, q6 = ${q[5]}, q7 = ${q[6]},
    q8 = ${q[7]}, q9 = ${q[8]},q10 = ${q[9]}
    WHERE user_id = ${current_user_id}`;
    const [users,fields] =  await db.execute(sql);
    console.log("in db!", users)
    return users[0];
}
exports.resetUser = async(current_user_id) =>{
    var sql = `DELETE FROM UsersViewed WHERE primary_user_id=${current_user_id}`;
    const [users,fields] =  await db.execute(sql);
    return users[0];
}

exports.getUserVector = async(current_user_id) =>{
    var sql = `Select * from QuizAnswer where user_id=${current_user_id}`;
    const [users,fields] =  await db.execute(sql);
    return users[0];
}

exports.getUser= async(current_user_id)=>{
    var sql=`Select * from User where id=${current_user_id}`;
    const [user,fields] =await db.execute(sql);
    return user;
}

exports.getMatchedUsers = async(current_user_id, res, next) =>{
    var sql = 'SELECT secondary_user_id FROM UsersViewed WHERE primary_user_id=?'
    const [users,fields] =  await db.execute(sql, [current_user_id]) //, (err, res,fields) => {
    return users;
}
exports.addUserMatch = async(current_user_id, match_user_id)=>{
    var sql = `INSERT INTO UsersViewed(primary_user_id, secondary_user_id) VALUES(${current_user_id},${match_user_id})`;
    const [users,fields] = await db.execute(sql)
    return users;
}

exports.getUserPassword = async(email) =>{
    var sql = `select * from User where email="${email}" limit 1`
    const [user, fields] = await db.execute(sql)
    return user
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
    
    const [users,fields] = await db.execute(queryString) //, (err,res)=>{
    return users;
}