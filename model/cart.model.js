const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserModel = require('./user.model');
const PlantModel = require('./plant.model');

const itemSchema = new Schema({
    plantId: {
        type: Schema.Types.ObjectId,
        ref: PlantModel.modelName,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    items: [itemSchema]
});

const CartModel = db.model('cart', cartSchema);
module.exports = CartModel;