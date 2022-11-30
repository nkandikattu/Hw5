var config = require('./configs/Config.js');

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./configs/Database2')
app.use(express.json())
app.use(cors())

const jwt = require('jsonwebtoken')

const mysql = require('mysql')

const db2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hw5DB'
})

app.get('/', (req, res) => {
    res.send("homepage for server")
});

app.post("/signup", (req, res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const emailid = req.body.emailid;
    const password = req.body.password;
    db.addUser(firstname, lastname, emailid, password);
})
const verifyJWT = (req, res, next)=>{
    const token = req.headers["x-access-token"]
    if(!token){
        res.json({
            loggedin: false,
            message: "no token found"
        })
    }
    else{
        jwt.verify(token, "jwtSecret", (err, decoded)=>{
            if(err){
                res.json({
                    loggedin: false,
                    message: "failed to authenticate"
                })
            }
            else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get("/isLoggedIn", verifyJWT, (req, res)=>{
    res.json({
        loggedin: true
    })
})

app.post("/login", (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    db2.query(
        "select * from user where email=?",
        [email],
        (err, result)=>{
            console.log(result)
            if(err){
                res.json({
                    auth: false,
                    message: "error finding user"
                })
            }
            else{
                if(result.length > 0 ){
                    if(result[0].password ==  password){
                        const id = result[0].id
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn: 600,
                        })
                        
                       res.json({
                        auth: true,
                        token: token,
                        result: result
                       })
                    }
                    else{
                        res.json({
                            auth: false,
                            message: "no user found"
                        })
                    }
                }
            }
        }
    )
})

app.get("/users/:id", async (req, res) => {
    const id = req.params.id
    const users = await getUsers(id)
    res.send(users)
  })

app.get("/users", async (req, res) => {
    const users = await getAllUsers()
    res.send(users)
  })

app.listen(config.port, () => {
    console.log('Server running on port ' + config.port);
});

user_distances=(users)=>{
    normalised_vector = new Map();
    users.array.forEach(element => {
        sum_of_squares = Math.pow(element.q1,2)+ Math.pow(element.q2,2)+Math.pow(element.q3,2)
        Math.pow(element.q4,2)+Math.pow(element.q5,2)+Math.pow(element.q6,2)+Math.pow(element.q7,2)+Math.pow(element.q8,2)+Math.pow(element.q9,2)
        +Math.pow(element.q10,2)
    sq_rt = Math.sqrt(sum_of_squares)
        
    });
}