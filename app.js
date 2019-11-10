const express = require('express')
const AuthService = require('./auth/auth-service');
var path = require('path');
const app = express();
const authRouter = require('./auth/auth-router');

app.use('/api/auth', authRouter);

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


module.exports = app;