const router = require("express").Router();
const CartController = require('../controller/cart.controller');

router.put('/addItemToCart', CartController.addItemToCart);
router.put('/removeItemFromCart', CartController.removeItemFromCart);
router.get('/getCart/:id', CartController.getCart);
router.put('/resetItems/:id', CartController.resetItems);

module.exports = router;