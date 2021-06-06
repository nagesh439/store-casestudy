const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const config = require('../config.json');


const auth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');
        const decoded = jwt.verify(token, config.secretKey);
        console.log(decoded)
        let user = await User.findOne({ _id: mongoose.Types.ObjectId(decoded._id), 'tokens.token':token});
        console.log(user)
        if(!user) throw new Error();
        req.user = user;
        req.user.expiresIn = decoded.exp;
        req.token = token;
        next();
    } catch (err) {
        console.log("Authentication failed with ",err,req.headers['authorization'].split(' '))
        res.status(401).send({ error: "Please Autheticate!" });
    }
}
module.exports = {
    auth
}