const CartModel = require("../model/cart.model");
const OrderModel = require("../model/order.model");
const PlantModel = require("../model/plant.model");

class CartService{
    static async initializeCart(userId) {
        try {
            const cart = new CartModel({userId, items: []});
            return await cart.save();
        } catch (error) {
            throw error
        }
    }

    static async findItem(userId, plantId) {
        try {
            const cart = await CartModel.findOne({ userId });
            const item = cart.items.find(item => item.plantId.toString() === plantId);

            return item;
        } catch (error) {
            throw error;
        }
    }
    

    static async addItemToCart(itemFound, userId, plantId) {
        try {
            let cart = await CartModel.findOne({ userId });

            if (itemFound) {
                const item = cart.items.find(item => item.plantId.toString() === plantId);
                item.amount += 1;
            } else {
                cart.items.push({plantId, amount: 1});
            }
            
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    static async removeItemFromCart(userId, plantId) {
        try {
            let cart = await CartModel.findOne({ userId });
            const itemIndex = cart.items.findIndex(item => item.plantId.toString() === plantId);

            cart.items[itemIndex].amount -= 1;
            if (cart.items[itemIndex].amount == 0) {
                cart.items.splice(itemIndex, 1);
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    static async getCart(userId) {
        try {
            let cart = await CartModel.findOne({ userId }).populate({
                path: 'items.plantId',
                model: PlantModel
            }).populate('userId');
            
            cart._doc.totalPrice = cart.items.reduce((total, item) => {
                return total + (item.amount * item.plantId.price);
            }, 0);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    static async resetItems(userId) {
        try {
            let cart = await CartModel.findOne({ userId });
            cart.items = [];

            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartService;