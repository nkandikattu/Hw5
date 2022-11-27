const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 8889
});

connection.connect(function(err) {
    
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to MySQL!");
    }
    

    let createDB = "CREATE DATABASE IF NOT EXISTS hw5DB"
    connection.query(createDB, function (err, result) {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Database created.");
        }
    });

    connection.end(function(err) {
        if (err) {
            return console.log(err.message);
        } else {
            console.log("MySQL connection ended.");
        }
    });

});

const db_con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'hw5DB'
});

console.log("Database connection created.");

let createUserTable = `CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
    )`;
db_con.query(createUserTable, function(err, results, fields) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("User table created.");
    }
});


let createQuizAnswerTable = `CREATE TABLE IF NOT EXISTS QuizAnswer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    q1 INT NOT NULL,
    q2 INT NOT NULL,
    q3 INT NOT NULL,
    q4 INT NOT NULL,
    q5 INT NOT NULL,
    q6 INT NOT NULL,
    q7 INT NOT NULL,
    q8 INT NOT NULL,
    q9 INT NOT NULL,
    q10 INT NOT NULL,
    CONSTRAINT FK_UserQuizAnswer FOREIGN KEY (user_id) REFERENCES User(id)
    )`;
db_con.query(createQuizAnswerTable, function(err, results, fields) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("QuizAnswer table created.");
    }
});


let createUsersViewedTable = `CREATE TABLE IF NOT EXISTS UsersViewed (
    id INT PRIMARY KEY AUTO_INCREMENT,
    primary_user_id INT NOT NULL,
    secondary_user_id INT NOT NULL,
    CONSTRAINT FK_PrimaryUserViewed FOREIGN KEY (primary_user_id) REFERENCES User(id)
    )`;
db_con.query(createUsersViewedTable, function(err, results, fields) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("UsersViewed table created.");
    }
});


db_con.end(function(err) {
    if (err) {
        return console.log(err.message);
    } else {
        console.log("Database connection ended.");
    }
});