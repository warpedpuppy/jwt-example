const express = require('express')
const authRouter = express.Router()
const { requireAuth } = require('../middleware/jwt-auth.js');
const AuthService = require("./auth-service")
const jsonBodyParser = express.json();

authRouter
.post('/get-token', jsonBodyParser, (req, res) => {
    let { val1, val2 } = req.body;
    let token = AuthService.createJwt(val1.toString(), { val2 });
    let parse = AuthService.parseBasicToken(token) 
    res
    .status(200)
    .json(token);
})
.get('/protected', requireAuth, (req, res) => {
    res.send(req.testing)
})
.get('/read-token', requireAuth, (req, res) => {
    let tokenData = req.tokenData;
    res.json({tokenData})
})

module.exports = authRouter