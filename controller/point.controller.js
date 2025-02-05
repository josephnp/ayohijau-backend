const PointService = require('../services/point.services');

exports.pointChange = async(req,res) => {
    try {
        console.log('Point.change');
        const userId = req.params.id;
        const {point, desc} = req.body;
        
        let pointChange = await PointService.pointChange(userId, point, desc);
        res.json({pointChange});
    } catch (error) {
        throw error;
    }
}

exports.requestRedeem = async(req,res) => {
    try {
        console.log('Point.redeem');
        const userId = req.params.id;
        const {point, desc, redeemPhone, redeemName} = req.body;
        
        let pointChange = await PointService.requestRedeem(userId, point, desc, redeemPhone, redeemName);
        res.json({pointChange});
    } catch (error) {
        throw error;
    }
}

exports.rejectRedeem = async(req,res) => {
    try {
        console.log('Point.reject');
        const id = req.params.id;
        const {userId, pointRefund, rejectReason} = req.body;
        
        let rejectPoint = await PointService.rejectRedeem(id, userId, pointRefund, rejectReason);
        res.json({rejectPoint});
    } catch (error) {
        throw error;
    }
}

exports.confirmRedeem = async(req,res) => {
    try {
        console.log('Point.verify');
        const id = req.params.id;
        const {desc} = req.body;
        
        let verifyPoint = await PointService.confirmRedeem(id, desc);
        res.json({verifyPoint});
    } catch (error) {
        throw error;
    }
}

exports.getPointsHistory = async(req,res) => {
    try {
        console.log('Point.history');
        const userId = req.params.id;

        let pointsHistory = await PointService.getPointsHistory(userId);
        res.json({pointsHistory});
    } catch (error) {
        throw error;
    }
}

exports.getPendingPoints = async(req,res) => {
    try {
        console.log('Point.pending');
        const userId = req.params.id;

        let pointsHistory = await PointService.getPendingPoints(userId);
        res.json({pointsHistory});
    } catch (error) {
        throw error;
    }
}

exports.getAllPendingPoints = async(req,res) => {
    try {
        console.log('Point.pending.all');
        const search = req.query.search;

        let pointsHistory = await PointService.getAllPendingPoints(search);
        res.json({pointsHistory});
    } catch (error) {
        throw error;
    }
}