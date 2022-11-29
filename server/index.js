var config = require('./configs/Config.js');

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./configs/Database2')
app.use(express.json())
app.use(cors())

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