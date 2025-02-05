const PhotoModel = require('../model/photo.model');
const UserPlantModel = require('../model/userplant.model');

class UserPlantService{
    static async addUserPlant(userId, plantId, name) {
        const addUserPlant = new UserPlantModel({userId, plantId, name});
        return await addUserPlant.save();
    }

    static async getUserPlants(userId) {
        const plants = await UserPlantModel.find({userId}).populate('userId').populate('plantId');

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const plant of plants) {
            const photoToday = await PhotoModel.findOne({
                userPlantId: plant._id,
                date: {$gte: today}
            });

            const newPlant = await PhotoModel.findOne({
                userPlantId: plant._id,
                verificationStatus: "Verified"
            });

            plant._doc.photoToday = !!photoToday;
            plant._doc.newPlant = !newPlant;

            if (!plant._doc.newPlant) {
                const mostRecentPhoto = await PhotoModel.findOne({
                    userPlantId: plant._id,
                    verificationStatus: "Verified"
                }).sort({date: -1});
    
                plant._doc.mostRecentPhoto = mostRecentPhoto ? mostRecentPhoto.image : null;
            } else {
                plant._doc.mostRecentPhoto = null;
            }            
        }

        return plants;
    }
}

module.exports = UserPlantService;