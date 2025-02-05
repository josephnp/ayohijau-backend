const router = require("express").Router();
const PlantController = require('../controller/plant.controller');
const upload = require('../middleware/upload');

router.post("/addPlant", upload.single('image'), PlantController.addPlant);
router.get('/getPlants', PlantController.getPlants);
router.put('/editPlant/:id', upload.single('image'), PlantController.updatePlant);

module.exports = router;