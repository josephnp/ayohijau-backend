const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserModel = require('./user.model');

const pointSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    oldPoints: {
        type: Number,
        required: true
    },
    newPoints: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    desc: {
        type: String ,
        required: true
    },
    redeemPhone: {
        type: String,
        required: false
    },
    redeemName: {
        type: String,
        required: false
    },
    rejectReason: {
        type: String,
        required: false
    }
});

pointSchema.pre('save', function(next) {
    const currentDate = new Date();
    const timezoneOffset = 7 * 60 * 60 * 1000;
    this.date = new Date(currentDate.getTime() + timezoneOffset);
    next();
});

const PointModel = db.model('point', pointSchema);
module.exports = PointModel;