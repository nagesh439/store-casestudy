const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.json');
// const config = require("./config.json");

const userSchema = mongoose.Schema({
    name: { 
        type: String,
        trim: true,
        required: true,
        minLength: 2,
        maxLength: 40
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true, // schematypes in mongoose documentation
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        // match: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    },
    age: { 
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be positive');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
   
    superAdmin: {
        type: Boolean,
        default: false
    },
    secretKey: {
        type: String,
        trim: true
    },
    superAdminExpiry: {
        type: Date
    }
}, {
    timestamps: true // adds createdAt and updatedAt timestamps
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    console.log(user)
    if(user){}else{throw new Error('Unable to login');}
    console.log(password, user.password)
    if(password == user.password){}else throw new Error('Unable to login');
   
    return user;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, config.secretKey, { expiresIn: '30d' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}


const User = mongoose.model('User', userSchema);

module.exports = User;