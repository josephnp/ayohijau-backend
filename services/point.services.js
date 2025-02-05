const UserModel = require('../model/user.model');
const PointModel = require('../model/point.model');

class PointService{
    static async pointChange(userId, point, desc) {
        const user = await UserModel.findById(userId);

        const pointHistory = new PointModel({userId, oldPoints: user.point, newPoints: user.point + point, status: "Done", desc});
        await pointHistory.save();

        user.point += point;
        return await user.save();
    }

    static async requestRedeem(userId, point, desc, redeemPhone, redeemName) {
        const user = await UserModel.findById(userId);

        const pointHistory = new PointModel({userId, oldPoints: user.point, newPoints: user.point + point, status: "Pending", desc, redeemPhone, redeemName});
        await pointHistory.save();

        user.point += point;
        return await user.save();
    }

    static async rejectRedeem(id, userId, pointRefund, rejectReason) {
        const pointHistory = await PointModel.findByIdAndUpdate(id, {status: "Rejected", rejectReason});
        await pointHistory.save();

        const user = await UserModel.findById(userId);
        user.point += pointRefund;
        await user.save();

        return;
    }

    static async confirmRedeem(id, desc) {
        const pointHistory = await PointModel.findByIdAndUpdate(id, {status: "Done", desc});
        await pointHistory.save();

        return pointHistory;
    }

    static async getPointsHistory(userId) {
        const pointsHistory = await PointModel.find({userId, status: "Done"}).populate('userId').sort({date: -1});
        return pointsHistory;
    }

    static async getPendingPoints(userId) {
        const pointsHistory = await PointModel.find({userId, status: {$ne: "Done"}}).populate('userId').sort({date: -1});
        return pointsHistory;
    }

    static async getAllPendingPoints(search) {
        const users = await UserModel.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { username: { $regex: search, $options: 'i' } }
            ]
        });

        const userIds = users.map(user => user._id);

        const pointsHistory = await PointModel.find({status: "Pending", userId: { $in: userIds }}).populate('userId').sort({date: -1});
        return pointsHistory;
    }
}

module.exports = PointService;