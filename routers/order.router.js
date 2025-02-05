const router = require("express").Router();
const OrderController = require('../controller/order.controller');
const upload = require('../middleware/upload');

router.post('/checkoutOrder/:id', OrderController.checkoutOrder);
router.get('/getOrder/:id', OrderController.getOrder);
router.get('/getPendingOrders', OrderController.getPendingOrders);
router.put('/cancelOrder/:id', OrderController.cancelOrder);
router.put('/payOrder/:id', upload.single('image'), OrderController.payOrder);
router.put('/rejectOrder/:id', OrderController.rejectOrder);
router.put('/deliverOrder/:id', OrderController.deliverOrder);
router.put('/confirmOrder/:id', OrderController.confirmOrder)

module.exports = router;