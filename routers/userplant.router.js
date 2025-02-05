const router = require('express').Router();
const UserPlantController = require('../controller/userplant.controller');

router.post('/addUserPlant/:id', UserPlantController.addUserPlant);
router.get('/getUserPlant/:id', UserPlantController.getUserPlants);

module.exports = router;