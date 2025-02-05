const db = require('../config/db');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(db);
const UserModel = require('./user.model');
const PlantModel = require('./plant.model');
const { Schema } = mongoose;

const receiptSchema = new Schema({
    plantId: {
        type: Schema.Types.ObjectId,
        ref: PlantModel.modelName,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    name: {
        type: [String],
        required: true
    }
})

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: UserModel.modelName,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    receipt: [receiptSchema],
    deliveryStatus: {
        type: String,
        required: true
    },
    deliveryLink: {
        type: String,
        required: false
    },
    paymentBank:{
        type: String,
        required: false
    },
    paymentAccount:{
        type: String,
        required: false
    },
    paymentImage:{
        type: String,
        required: false,
    }
});

orderSchema.plugin(AutoIncrement, {inc_field: 'orderCounter'});

orderSchema.pre('save', async function(next) {
    const currentDate = new Date();
    const timezoneOffset = 7 * 60 * 60 * 1000;
    this.date = new Date(currentDate.getTime() + timezoneOffset);

    next();
});

const OrderModel = db.model('order', orderSchema);
module.exports = OrderModel;