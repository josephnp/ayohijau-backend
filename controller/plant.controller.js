const PlantService = require('../services/plant.services');
const uploadToS3 = require('../config/aws');

exports.addPlant = async (req,res)=>{
    try {
        console.log('Plant.add');
        const {name, price, desc, water, sunlight, temperature, fertilizer} = req.body;

        const image = await uploadToS3(req.file);
        console.log(image);

        let plant = await PlantService.addPlant(name, price, desc, water, sunlight, temperature, fertilizer, image);
        res.json({plant});
    } catch (error) {
        throw error;
    }
}

exports.getPlants = async (req,res)=>{
    try {
        console.log('Plant.get');
        const name = req.query.name;

        let plants = await PlantService.getPlants(name);
        res.json({plants});
    } catch (error) {
        throw error;
    }
}

exports.updatePlant = async (req,res)=>{
    try {
        console.log('Plant.update');
        const {name, price, desc, water, sunlight, temperature, fertilizer, imageUrl} = req.body;
        const id = req.params.id;

        const image = req.file ? await uploadToS3(req.file) : null;
        console.log(image);

        let updatedPlant = await PlantService.updatePlant(id, name, price, desc, water, sunlight, temperature, fertilizer, image, imageUrl);
        res.json({updatedPlant});
    } catch (error) {
        throw error;
    }
}