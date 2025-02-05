const PlantModel = require('../model/plant.model');

class PlantService {
    static async addPlant(name, price, desc, water, sunlight, temperature, fertilizer, image) {
        const addPlant = new PlantModel({name, price, desc, water, sunlight, temperature, fertilizer, image});
        return await addPlant.save();
    }

    static async getPlants(name) {
        const query = name ? { name: { $regex: name, $options: 'i' } } : {};
        const plants = await PlantModel.find(query);
        return plants;
    }

    static async updatePlant(id, name, price, desc, water, sunlight, temperature, fertilizer, image, imageUrl) {
        if (image == null) {
            const updatedPlant = await PlantModel.findByIdAndUpdate(id, {name, price, desc, water, sunlight, temperature, fertilizer, image: imageUrl});
            return updatedPlant;
        } else {
            const updatedPlant = await PlantModel.findByIdAndUpdate(id, {name, price, desc, water, sunlight, temperature, fertilizer, image});
            return updatedPlant;
        }
    }
}

module.exports = PlantService;
