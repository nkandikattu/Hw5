const express = require('express')
const path = require('path')
var config = require('./Config.js');
const app = express()

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('/login-vulnerable', async(req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))

})
app.get('*', async(req, res)=>{
    res.header("X-Frame-Options", "DENY")
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})
app.listen(config.clientPort, ()=>{
    console.log("server is running on ", config.clientPort)
    
})