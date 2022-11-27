const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("homepage for server")
});

app.listen(3001, () => {
    console.log('running on port 3001');
});