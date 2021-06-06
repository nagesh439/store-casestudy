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
        let user = await User.findOne({ _id: mongoose.Types.ObjectId(decoded._id)});
        console.log(user)
        if(!user) throw new Error();
        req.superAdminAccess = false;
        // if(user.superAdmin) {
        //     req.superAdminAccess = await bcrypt.compare(secretKey, user.secretKey);
        // }
        req.user = user;
        req.user.expiresIn = decoded.exp;
        req.token = token;
        next();
    } catch (err) {
        console.log("Authentication failed with ",err,req.headers['authorization'].split(' '))
        res.status(401).send({ error: "Please Autheticate!" });
    }
}

const superAdminAuth = async (req, res, next) => {
    try {
        console.log("888888****8888888")

        const token = req.headers['authorization'].replace('Bearer ', '');
        const decoded = jwt.verify(token, "scre");
        const user = await User.findOne({ _id: mongoose.Types.ObjectId(decoded._id), 'tokens.token': token });
        console.log(user)
        if(!user) throw new Error();
        if(user.superAdmin) {
            // check the user expiryTime
            if(!user.superAdminExpiry) throw new Error();
            if(moment(user.superAdminExpiry).isBefore(moment())) {
                user.superAdminExpiry = undefined;
                user.tokens = [];
                await user.save();
                throw new Error();
            } else {
                const now = new Date();
                user.superAdminExpiry = new Date().setMinutes(now.getMinutes() + 5);
                await user.save();
            }
        } else {
            throw new Error('Not a superadmin');
        }
        req.user = user;
        req.user.expiresIn = decoded.exp;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send({ error: "Please Autheticate!" });
    }
}

module.exports = {
    auth,
    superAdminAuth
}