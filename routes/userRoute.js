const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const {auth} = require('../middleware/auth');


module.exports = function(app){

    app.post('/createUsers', async (req, res) => {  // create account or signup route
        console.log("req.body")
        const user = new User(req.body);
        try {
            await user.save();
            const token = await user.generateAuthToken(); 
            res.status(201).send({ user, token });
        }   catch (err) {
            console.error(err);
            res.status(400).send(err)
        }
    });
    
    app.post('/users/login', async (req, res) => {
        try {
            let user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken(); 
            user['expiresIn'] = await new Date().setHours(new Date().getHours() + 2);
            res.send({ user, token, expiresIn: new Date().setHours(new Date().getHours() + 2) });
        } catch (err) {
            console.error(err);
            res.status(400).send(err);
        }
    });
    
    app.post('/users/logout', auth, async (req, res) => {
        try {
            console.log(req.token)
            // req.user.tokens = req.user.tokens.filter(token => { return token.token != req.token });
            // console.log("req.user.tokens",req.user.tokens)
            req.user.tokens = []
            await req.user.save();
            res.status(200).send();
        } catch (err) {
            res.status(500).send();
        }
    });
    
    app.post('/users/logoutAll', auth, async (req, res) => {
        try {
            req.user.tokens = [];
            await req.user.save();
            res.status(200).send();
        } catch (err) {
            res.status(500).send();
        }
    });
}