const CartService = require('../services/cart.services');

exports.addItemToCart = async (req,res) => {
    try {
        console.log('Cart.addItem');
        const {userId,plantId} = req.body;

        let itemFound = await CartService.findItem(userId, plantId);
        let cartAdd = await CartService.addItemToCart(itemFound, userId, plantId);

        res.json({cartAdd});
    } catch (error) {
        throw error;
    }
}

exports.removeItemFromCart = async (req,res) => {
    try {
        console.log('Cart.removeItem');
        const {userId,plantId} = req.body;

        let cartRemove = await CartService.removeItemFromCart(userId, plantId);
        res.json({cartRemove});
    } catch (error) {
        throw error;
    }
}

exports.getCart = async (req,res) => {
    try {
        console.log('Cart.get');
        const userId = req.params.id;

        let cart = await CartService.getCart(userId);
        res.json({cart});
    } catch (error) {
        throw error;
    }
}

exports.resetItems = async (req,res) => {
    try {
        console.log('Cart.reset');
        const userId = req.params.id;

        let cart = await CartService.resetItems(userId);
        res.json({cart});
    } catch (error) {
        throw error;
    }
}