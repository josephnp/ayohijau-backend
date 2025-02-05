const db = require('../config/db');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: false,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber:{
        type: String,
        required: false,
    },
    address:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    point:{
        type: Number,
        required: false,
    },
    role:{
        type: String,
        required: true,
    }
});

userSchema.methods.checkPassword = async function (password) {
    try {
        const isCheck = await bcrypt.compare(password, this.password);
        return isCheck;
    } catch (error) {
        throw error;
    }
}

const UserModel = db.model('user', userSchema);
module.exports = UserModel;