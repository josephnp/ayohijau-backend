const UserModel = require('../model/user.model');
const PointModel = require('../model/point.model');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');

class UserService{
    static async registerUser(name, username, phoneNumber, address, email, password, role, point){
        try {
            const createUser = new UserModel({name, username, phoneNumber, address, email, password, role, point});
            return await createUser.save();
        } catch (error) {
            throw error;
        }
    }

    static async getUsername(username){
        try {
            return await UserModel.findOne({username});
        } catch (error) {
            throw error;
        }
    }

    static async getUserEmail(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static usernameValid(username){
        try {
            return (!username.includes("@") && !username.includes(" "));
        } catch (error) {
            throw error;
        }
    }

    static async emailValid(email){
        try {
            return await emailValidator.validate(email);
        } catch (error) {
            throw error;
        }
    }

    static passwordValid(password){
        try {
            return password.length >= 6;
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData, secretKey, expireDuration){
        return await jwt.sign(tokenData, secretKey, {expiresIn: expireDuration});
    }

    static async updateUser(id, name, username, phoneNumber, address, email, password) {
        const updatedUser = await UserModel.findByIdAndUpdate(id, {name, username, phoneNumber, address, email, password});
        return updatedUser;
    }
}

module.exports = UserService;