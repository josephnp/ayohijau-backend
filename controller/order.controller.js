const OrderService = require('../services/order.services');
const uploadToS3 = require('../config/aws');
const UserPlantModel = require('../model/userplant.model');

exports.checkoutOrder = async (req,res) => {
    try {
        console.log('Order.checkout');
        const userId = req.params.id;
        const items = req.body;

        for (const plantId in items) {
            const names = items[plantId];
            for (const name of names) {
                const existUserPlant = await UserPlantModel.findOne({ userId, name });
                if (existUserPlant) {
                    throw new Error("Nama tanaman " + name + " sudah ada. Mohon pilih nama lain!")
                }
            }
        }

        let newOrder = await OrderService.checkoutOrder(userId, items);
        res.json({newOrder});
    } catch (error) {
        res.status(400).json({
            'status': error.message
        })
    }
}

exports.getOrder = async (req,res) => {
    try {
        console.log('Order.getByUserId');
        const userId = req.params.id;
        let order = await OrderService.getOrder(userId);

        res.json({order});
    } catch (error) {
        throw error;
    }
}

exports.getPendingOrders = async (req,res) => {
    try {
        console.log('Order.getPending');
        const search = req.query.search;

        let orders = await OrderService.getPendingOrders(search);
        res.json({orders});
    } catch (error) {
        throw error;
    }
}

exports.cancelOrder = async (req,res) => {
    try {
        console.log('Order.cancel');
        const id = req.params.id;

        let updatedOrder = await OrderService.cancelOrder(id);
        res.json({updatedOrder});
    } catch (error) {
        throw error;
    }
}

exports.payOrder = async (req,res) => {
    try {
        console.log('Order.pay');
        const id = req.params.id;
        const {bank, account} = req.body;

        const image = await uploadToS3(req.file);
        console.log(image);

        let updatedOrder = await OrderService.payOrder(id, bank, account, image);
        res.json({updatedOrder});
    } catch (error) {
        throw error;
    }
}

exports.rejectOrder = async (req,res) => {
    try {
        console.log('Order.reject');
        const id = req.params.id;
        const {reason} = req.body;

        let updatedOrder = await OrderService.rejectOrder(id, reason);
        res.json({updatedOrder});
    } catch (error) {
        throw error;
    }
}

exports.deliverOrder = async (req,res) => {
    try {
        console.log('Order.deliver');
        const {link} = req.body;
        const id = req.params.id;

        let updatedOrder = await OrderService.deliverOrder(id, link);
        res.json({updatedOrder});
    } catch (error) {
        throw error;
    }
}

exports.confirmOrder = async (req,res) => {
    try {
        console.log('Order.confirm');
        const id = req.params.id;

        let updatedOrder = await OrderService.confirmOrder(id);
        res.json({updatedOrder});
    } catch (error) {
        throw error;
    }
}