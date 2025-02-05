const router = require('express').Router();
const PointController = require('../controller/point.controller');

router.put('/pointChange/:id', PointController.pointChange);
router.post('/requestRedeem/:id', PointController.requestRedeem);
router.put('/rejectRedeem/:id', PointController.rejectRedeem);
router.put('/confirmRedeem/:id', PointController.confirmRedeem);
router.get('/getPointsHistory/:id', PointController.getPointsHistory);
router.get('/getPendingPoints/:id', PointController.getPendingPoints);
router.get('/getAllPendingPoints', PointController.getAllPendingPoints);

module.exports = router;