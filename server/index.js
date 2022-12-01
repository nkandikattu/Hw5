var config = require('./configs/Config.js');

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./configs/Database2')
const router = express.Router();
app.use(express.json())
app.use(cors())

const jwt = require('jsonwebtoken')

const mysql = require('mysql')



const db2 = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.db
})

app.get('/', (req, res) => {
    res.send("homepage for server")
});


app.get("/moreLikeThis", async(req,res)=>{
    current_user_id = req.query.current_user_id;
    matched_user_id = req.query.matched_user_id;
    currentUserVector = await db.getUserVector(current_user_id);
    matchedUserVector = await db.getUserVector(matched_user_id);
    q=[];
    q.push(currentUserVector.q1 + 0.1*matchedUserVector.q1)
    q.push(currentUserVector.q2 + 0.1*matchedUserVector.q2)
    q.push(currentUserVector.q3 + 0.1*matchedUserVector.q3)
    q.push(currentUserVector.q4 + 0.1*matchedUserVector.q4)
    q.push(currentUserVector.q5 + 0.1*matchedUserVector.q5)
    q.push(currentUserVector.q6 + 0.1*matchedUserVector.q6)
    q.push(currentUserVector.q7 + 0.1*matchedUserVector.q7)
    q.push(currentUserVector.q8 + 0.1*matchedUserVector.q8)
    q.push(currentUserVector.q9 + 0.1*matchedUserVector.q9)
    q.push(currentUserVector.q10 + 0.1*matchedUserVector.q10)
    
    q = normaliseVector(q);
    var updateVector = await db.updateUserVector(current_user_id, q)
    res.send(updateVector);

})
app.get("/lessLikeThis", async(req,res)=>{
    current_user_id = req.query.current_user_id;
    matched_user_id = req.query.matched_user_id;
    currentUserVector = await db.getUserVector(current_user_id);
    matchedUserVector = await db.getUserVector(matched_user_id);
    q=[];
    q.push(currentUserVector.q1 - 0.1*matchedUserVector.q1)
    q.push(currentUserVector.q2 - 0.1*matchedUserVector.q2)
    q.push(currentUserVector.q3 - 0.1*matchedUserVector.q3)
    q.push(currentUserVector.q4 - 0.1*matchedUserVector.q4)
    q.push(currentUserVector.q5 - 0.1*matchedUserVector.q5)
    q.push(currentUserVector.q6 - 0.1*matchedUserVector.q6)
    q.push(currentUserVector.q7 - 0.1*matchedUserVector.q7)
    q.push(currentUserVector.q8 - 0.1*matchedUserVector.q8)
    q.push(currentUserVector.q9 - 0.1*matchedUserVector.q9)
    q.push(currentUserVector.q10 - 0.1*matchedUserVector.q10)
    
    q = normaliseVector(q);
    var updateVector = await db.updateUserVector(current_user_id, q)
    res.send(updateVector);

})
app.get("/reset", async(req,res)=>{
    //When no matches remain, reset all the matches for the current user. i.e. delete all entries from the matched table/
    current_user_id = req.query.id;
    var delUsers = await db.resetUser(current_user_id);
    res.send(delUsers);

})

 app.get("/refineDate", async(req,res,next)=>{
    var matchedUserInfo;
    current_user_id = req.query.id;
    // get the ids of all the users that have already been matched with the current user
    var matchedUsersResult = await db.getMatchedUsers(current_user_id);
    
    otherUsersResult = await db.getOtherUsers(matchedUsersResult,current_user_id); //vectors of potential matches excluding self and already matched users
    if(otherUsersResult.length <=0)
    {
        res.send(matchedUserInfo); //no matches left.
    }
    currentUserVector = await db.getUserVector(current_user_id);    // get current user's vector
    console.log(currentUserVector)

    var minDist = Number.MAX_VALUE;;
    var matchedId;
    //for every potential match, find bestpossible match i.e. min euclidian distance and add this match to table.
        otherUsersResult.forEach(element => {
        var dist = getEuclidianDistance(element, currentUserVector) ;
        console.log(dist)
        if(dist<=minDist){
            minDist = dist;
            matchedId = element.user_id;
            console.log(`Matched id: ${matchedId}`)
        }
    });
    if(matchedId!=null){ //we got some match, add this to the db and return user info.
        matchedUserInfo = await db.getUser(matchedId);
        await db.addUserMatch(current_user_id, matchedId);
    }
    res.send(matchedUserInfo);
})


app.post("/signup", (req, res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const emailid = req.body.emailid;
    const password = req.body.password;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    var modq = Math.sqrt(q1*q1) + (q2+q2) + (q3*q3) + (q4*q4) + (q5*q5) + (q6*q6) + (q7*q7) + (q8*q8) + (q9*q9) + (q10 * q10)
    q1 = q1/modq;
    q2 = q2/modq;
    q3 = q3/modq;
    q4 = q4/modq;
    q5 = q5/modq;
    q6 = q6/modq;
    q7 = q7/modq;
    q8 = q8/modq;
    q9 = q9/modq;
    q10 = q10/modq;

    db.addUser(firstname, lastname, emailid, password);
    db.addQuizAnswers(emailid, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10);
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
                        user_id: result[0].id
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


app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});


function normaliseVector(q) {
    var modq = Math.sqrt(q[0] * q[0]) + (q[1] * q[1]) + (q[2] * q[2]) + (q[3] * q[3])
        + (q[4] * q[4]) + (q[5] * q[5]) + (q[6] * q[6]) + (q[7] * q[7]) + (q[8] * q[8]) + (q[9] * q[9]);
    q[0] = q[0] / modq;
    q[1] = q[1] / modq;
    q[2] = q[2] / modq;
    q[3] = q[3] / modq;
    q[4] = q[4] / modq;
    q[5] = q[5] / modq;
    q[6] = q[6] / modq;
    q[7] = q[7] / modq;
    q[8] = q[8] / modq;
    q[9] = q[9] / modq;
    return q;
}

function getEuclidianDistance(element, currentUserVector) {
    return Math.sqrt(Math.pow((element.q1 - currentUserVector.q1), 2) + Math.pow((element.q2 - currentUserVector.q2), 2) + Math.pow((element.q3 - currentUserVector.q3), 2)
        + Math.pow((element.q4 - currentUserVector.q4), 2) + Math.pow((element.q5 - currentUserVector.q5), 2) + Math.pow((element.q6 - currentUserVector.q6), 2)
        + Math.pow((element.q7 - currentUserVector.q7), 2) + Math.pow((element.q8 - currentUserVector.q8), 2) + Math.pow((element.q9 - currentUserVector.q9), 2)
        + Math.pow((element.q10 - currentUserVector.q10), 2));
}
