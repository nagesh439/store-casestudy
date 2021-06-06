const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.json');
// const config = require("./config.json");
const saltRound = 8;

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
        // match: /(?=^.{8,}$)((?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/
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
        },
        loggedInAt:Date.now()
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
    if(!user) throw new Error('Unable to login');
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Unable to login');

    return user;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, config.secretKey, { expiresIn: '30d' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.pre('save', async function(next) {   // No arrow function // 
    const user = this;
    if(user.isModified('password')) user.password = await bcrypt.hash(user.password, saltRound);
    next();
});

userSchema.methods.toJSON = function() {/// restricting data to send to client
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.superAdmin;

    return userObject;
}


const User = mongoose.model('User', userSchema);

module.exports = User;