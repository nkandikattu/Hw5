var config = require('./Config.js');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.dbPort
});

connection.connect(function(err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to MySQL!");
    }
});

connection.query('DROP DATABASE IF EXISTS hw5DB', 
    function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            console.log("Previous database dropped if existed.");
        }

    }
);

connection.query('CREATE DATABASE hw5DB', 
    function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            console.log("Database created.");
        }
   }
);

connection.query('USE hw5DB', 
    function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            console.log("Using database hw5DB.");
        }
    }
);


let createUserTable = `CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(225) NOT NULL
    )`;
connection.query(createUserTable,
    function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            console.log("User table created.");
        }
    }
);


let createQuizAnswerTable = `CREATE TABLE IF NOT EXISTS QuizAnswer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    q1 FLOAT NOT NULL,
    q2 FLOAT NOT NULL,
    q3 FLOAT NOT NULL,
    q4 FLOAT NOT NULL,
    q5 FLOAT NOT NULL,
    q6 FLOAT NOT NULL,
    q7 FLOAT NOT NULL,
    q8 FLOAT NOT NULL,
    q9 FLOAT NOT NULL,
    q10 FLOAT NOT NULL,
    CONSTRAINT FK_UserQuizAnswer FOREIGN KEY (user_id) REFERENCES User(id)
    )`;
connection.query(createQuizAnswerTable,
    function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            console.log("QuizAnswer table created.");
        }
    }
);


let createUsersViewedTable = `CREATE TABLE IF NOT EXISTS UsersViewed (
    id INT PRIMARY KEY AUTO_INCREMENT,
    primary_user_id INT NOT NULL,
    secondary_user_id INT NOT NULL,
    CONSTRAINT FK_PrimaryUserViewed FOREIGN KEY (primary_user_id) REFERENCES User(id)
    )`;
connection.query(createUsersViewedTable,
    function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            console.log("UsersViewed table created.");
        }
    }
);


connection.end(function(err) {
    if (err) {
        throw error;
    } else {
        console.log("Connection ended!");
    }
});