const PlantService = require("../services/plant.services");
const UserPlantService = require("../services/userplant.services");

exports.addUserPlant = async (req,res) => {
    try {
        console.log('UserPlant.add');
        const userId = req.params.id;
        const{plantId,name} = req.body;
        
        let userPlant= await UserPlantService.addUserPlant(userId, plantId, name);

        res.json({userPlant});
    } catch (error) {
        throw error;
    }
}

exports.getUserPlants = async (req,res) => {
    try {
        console.log('UserPlant.get');
        const userId = req.params.id;

        let plants = await UserPlantService.getUserPlants(userId);
        res.json({plants});
    } catch (error) {
        throw error;
    }
}