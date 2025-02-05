const router = require('express').Router();
const UserController = require('../controller/user.controller');

router.post('/registration', UserController.register);
router.post('/login', UserController.login);
router.put('/validateUpdateUser/:id', UserController.validateUserData);
router.put('/updateUser/:id', UserController.updateUser);

module.exports = router;