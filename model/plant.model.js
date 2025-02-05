const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

let plantSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    water:{
        type:String,
        required:true,
    },
    sunlight:{
        type:String,
        required:true,
    },
    temperature:{
        type:String,
        required:true,
    },
    fertilizer:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    }
});

const PlantModel = db.model('plant', plantSchema);
module.exports = PlantModel;