const OrderModel = require("../model/order.model");
const PlantModel = require("../model/plant.model");
const UserModel = require("../model/user.model");

class OrderService{
    static async checkoutOrder(userId, items) {
        try {
            const receipt = Object.entries(items).map(([plantId, names]) => ({
                plantId,
                amount: names.length,
                name: names
            }));

            const newOrder = new OrderModel({userId, receipt, deliveryStatus: "Waiting"});
            return await newOrder.save();
        } catch (error) {
            throw error;
        }
    }

    static async getOrder(userId) {
        try {
            const orders = await OrderModel.find({userId}).populate({
                path: 'receipt.plantId',
                model: PlantModel
            }).populate('userId').sort({orderDate: -1});

            for (var order of orders) {
                order._doc.totalPrice = order.receipt.reduce((total, item) => {
                    return total + (item.amount * item.plantId.price);
                }, 0);
            }

            return orders;
        } catch (error) {
            throw error;
        }
    }

    static async getPendingOrders(search) {
        try {
            const users = await UserModel.find({
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { username: { $regex: search, $options: 'i' } }
                ]
            });

            const userIds = users.map(user => user._id);

            // const query = search ? { orderCounter: { $regex: search }} : {};
            
            const orders = await OrderModel.find({deliveryStatus: "Pending", userId: { $in: userIds }}).populate({
                path: 'receipt.plantId',
                model: PlantModel
            }).populate('userId').sort({orderDate: -1});

            for (var order of orders) {
                order._doc.totalPrice = order.receipt.reduce((total, item) => {
                    return total + (item.amount * item.plantId.price);
                }, 0);
            }

            return orders;
        } catch (error) {
            throw error;
        }
    }

    // static async getPendingOrders(search) {
    //     try {
    //         const users = await UserModel.find({
    //             $or: [
    //                 { name: { $regex: search, $options: 'i' } },  
    //                 { username: { $regex: search, $options: 'i' } } 
    //             ]
    //         });
     
           
    //         const userIds = users.map(user => user._id);
     
         
    //         const query = {
    //             $and: [
    //                 { deliveryStatus: "Pending" }, {
    //                     $or: [
    //                         { orderCounter: { $regex: search, $options: 'i' } }, // Search by orderCounter
    //                         { userId: { $in: userIds } } // Include orders for found user IDs
    //                     ]
    //                 }
    //             ]
    //         };
     
            
    //         const orders = await OrderModel.find(query)
    //             .populate({
    //                 path: 'receipt.plantId',
    //                 model: PlantModel
    //             })
    //             .populate('userId')
    //             .sort({ orderDate: -1 });
     
          
    //         for (const order of orders) {
    //             order._doc.totalPrice = order.receipt.reduce((total, item) => {
    //                 return total + (item.amount * item.plantId.price);
    //             }, 0);
    //         }
     
       
    //         return orders;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    static async cancelOrder(id) {
        try {
            const updatedOrder = await OrderModel.findByIdAndUpdate(id, {deliveryStatus: "Canceled"});
            return updatedOrder;
        } catch (error) {
            throw error;
        }
    }

    static async payOrder(id, bank, account, imageUrl) {
        try {
            const updatedOrder = await OrderModel.findByIdAndUpdate(id, {deliveryStatus: "Pending", paymentBank: bank, paymentAccount: account, paymentImage: imageUrl});
            return updatedOrder;
        } catch (error) {
            throw error;
        }
    }

    static async rejectOrder(id, reason) {
        try {
            const updatedOrder = await OrderModel.findByIdAndUpdate(id, {deliveryStatus: "Rejected " + reason});
            return updatedOrder;
        } catch (error) {
            throw error;
        }
    }

    static async deliverOrder(id, link) {
        try {
            const updatedOrder = await OrderModel.findByIdAndUpdate(id, {deliveryStatus: "Deliver", deliveryLink: link});
            return updatedOrder;
        } catch (error) {
            throw error;
        }
    }

    static async confirmOrder(id) {
        try {
            const updatedOrder = await OrderModel.findByIdAndUpdate(id, {deliveryStatus: "Confirm"});
            return updatedOrder;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderService;