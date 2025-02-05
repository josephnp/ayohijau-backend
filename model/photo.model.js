const db = require('../config/db');
const mongoose = require('mongoose');
const UserPlantModel = require('./userplant.model');
const { Schema } = mongoose;

let photoSchema = new Schema({
    image:{
        type:String,
        required:true,
    },
    userPlantId:{
        type:Schema.Types.ObjectId,
        ref: UserPlantModel.modelName
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    verificationStatus:{
        type:String,
        required: true
    },
    rejectReason:{
        type:String,
        required: false
    }
});

photoSchema.pre('save', function(next) {
    const currentDate = new Date();
    const timezoneOffset = 7 * 60 * 60 * 1000;
    this.date = new Date(currentDate.getTime() + timezoneOffset);
    next();
});

const PhotoModel = db.model('photo', photoSchema);
module.exports = PhotoModel;