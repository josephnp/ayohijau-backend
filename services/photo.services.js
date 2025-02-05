const PhotoModel = require('../model/photo.model');
const PlantModel = require('../model/plant.model');
const UserModel = require('../model/user.model');
const UserPlantModel = require('../model/userplant.model');

class PhotoService {
    static async dailyPhoto(image, userPlantId) {
        const addPhoto = new PhotoModel({image, userPlantId, verificationStatus: "Pending"});
        return await addPhoto.save();
    }

    static async retakePhoto(id, image) {
        try {
            var updatedPhoto = await PhotoModel.findByIdAndUpdate(id, {image});
            updatedPhoto = this.updatePhotoStatus(id, "Pending");

            return updatedPhoto;
        } catch (error) {
            throw error;
        }
    }

    static async getUserPhotos(userId) {
        try {
            const photos = await PhotoModel.find().populate(({
                path: 'userPlantId',
                populate: [
                    {
                        path: 'userId',
                        model: UserModel
                    },
                    {
                        path: 'plantId',
                        model: PlantModel
                    }
                ],
                match: { userId: userId }
            })).sort({date: -1});

            const userPhotos = photos.filter(photo => photo.userPlantId !== null);
            return userPhotos;
        } catch (error) {
            throw error;
        }
    }

    // static async getPendingPhotos(search) {
    //     try {
    //         const users = await UserModel.find({
    //             $or: [
    //                 { name: { $regex: search, $options: 'i' } },
    //                 { username: { $regex: search, $options: 'i' } }
    //             ]
    //         });

    //         const userIds = users.map(user => user._id);

    //         const photos = await PhotoModel.find({verificationStatus: "Pending", userId: { $in: userIds }}).populate({
    //             path: 'userPlantId',
    //             populate: [
    //                 {
    //                     path: 'userId',
    //                     model: UserModel
    //                 },
    //                 {
    //                     path: 'plantId',
    //                     model: PlantModel
    //                 }
    //             ]
    //         }).sort({date: -1});
    //         return photos;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    static async getPendingPhotos(search) {
        try {
            const users = await UserModel.find({
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { username: { $regex: search, $options: 'i' } }
                ]
            });

            const userIds = users.map(user => user._id);

            const photos = await PhotoModel.find({verificationStatus: "Pending",
                userPlantId: {
                    $in: (await UserPlantModel.find({userId: { $in: userIds }})).map(userPlant => userPlant._id)
                }
            }).populate({
                path: 'userPlantId',
                populate: [
                    {
                        path: 'userId',
                        model: UserModel
                    },
                    {
                        path: 'plantId',
                        model: PlantModel
                    }
                ]
            }).sort({ date: -1 });
    
            return photos;
        } catch (error) {
            throw error;
        }
    }    

    static async verifyPhoto(id) {
        try {
            const updatedPhoto = this.updatePhotoStatus(id, "Verified");
            return updatedPhoto;
        } catch (error) {
            throw error;
        }
    }

    static async rejectPhoto(id, reason) {
        try {
            var updatedPhoto = await PhotoModel.findByIdAndUpdate(id, {rejectReason: reason});
            updatedPhoto = this.updatePhotoStatus(id, "Rejected");
            return updatedPhoto;
        } catch (error) {
            throw error;
        }
    }

    static async updatePhotoStatus(id, status) {
        try {
            const updatedPhoto = await PhotoModel.findByIdAndUpdate(id, {verificationStatus: status});
            return updatedPhoto;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = PhotoService;