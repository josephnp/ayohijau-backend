const router = require("express").Router();
const PhotoContoller = require('../controller/photo.controller');
const upload = require('../middleware/upload');

router.post("/dailyPhoto/:id", upload.single('image'), PhotoContoller.dailyPhoto);
router.put("/retakePhoto/:id", upload.single('image'), PhotoContoller.retakePhoto);
router.get("/getUserPhotos/:id", PhotoContoller.getUserPhotos);
router.get("/getPendingPhotos", PhotoContoller.getPendingPhotos);
router.put("/verifyPhoto/:id", PhotoContoller.verifyPhoto);
router.put("/rejectPhoto/:id", PhotoContoller.rejectPhoto);

module.exports = router;