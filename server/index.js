var config = require('./configs/Config.js');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("homepage for server")
});

app.listen(config.port, () => {
    console.log('running on port ' + config.port);
});