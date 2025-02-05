const PhotoService = require('../services/photo.services');
const uploadToS3 = require('../config/aws');

exports.dailyPhoto = async (req,res) => {
    try {
        console.log('Photo.take');
        const userPlantId = req.params.id;

        const image = await uploadToS3(req.file);
        console.log(image);

        let photo = await PhotoService.dailyPhoto(image, userPlantId);
        res.json({photo});
    } catch (error) {
        throw error;
    }
}

exports.retakePhoto = async (req,res) => {
    try {
        console.log('Photo.retake');
        const photoId = req.params.id;
        const image = await uploadToS3(req.file);
        console.log(image);

        let photo = await PhotoService.retakePhoto(photoId, image);
        res.json({photo});
    } catch (error) {
        throw error;
    }
}

exports.getUserPhotos = async (req,res) => {
    try {
        console.log('Photo.user');
        const userId = req.params.id;

        let photos = await PhotoService.getUserPhotos(userId);
        res.json({photos});
    } catch (error) {
        throw error;
    }
}

exports.getPendingPhotos = async (req,res) => {
    try {
        console.log('Photo.pending');
        const search = req.query.search;

        let photos = await PhotoService.getPendingPhotos(search);
        res.json({photos});
    } catch (error) {
        throw error;
    }
}

exports.verifyPhoto = async (req,res) => {
    try {
        console.log('Photo.verify');
        const id = req.params.id;

        let verifiedPhoto = await PhotoService.verifyPhoto(id);
        res.json({verifiedPhoto});
    } catch (error) {
        throw error;
    }
}

exports.rejectPhoto = async (req,res) => {
    try {
        console.log('Photo.reject');
        const id  = req.params.id;
        const {reason} = req.body;

        let rejectedPhoto = await PhotoService.rejectPhoto(id, reason);
        res.json({rejectedPhoto});
    } catch (error) {
        throw error;
    }
}