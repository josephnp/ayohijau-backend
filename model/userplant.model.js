const db = require('../config/db');
const mongoose = require('mongoose');
const UserModel = require('./user.model');
const PlantModel = require('./plant.model');
const { Schema } = mongoose;

let userplantSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName
    },
    plantId:{
        type: Schema.Types.ObjectId,
        ref: PlantModel.modelName
    },
    name:{
        type: String,
        required: true
    }
});

const UserPlantModel = db.model('userplant', userplantSchema);
module.exports = UserPlantModel;