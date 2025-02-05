const bcrypt = require('bcryptjs');
const CartService = require('../services/cart.services');
const UserService = require('../services/user.services');

exports.register = async(req,res)=>{
    try {
        console.log('User.register');
        const {name, username, phoneNumber, address, email, password, role, point} = req.body;

        const usernameExist = await UserService.getUsername(username);
        if (usernameExist) {
            throw new Error('Username sudah terdaftar');
        }

        const emailExist = await UserService.getUserEmail(email);
        if (emailExist) {
            throw new Error('Email sudah terdaftar');
        }

        const usernameValid = await UserService.usernameValid(username);
        if (!usernameValid) {
            throw new Error('Username tidak valid');
        }

        if (role == "User") {
            const emailValid = await UserService.emailValid(email);
            if (!emailValid) {
                throw new Error('Email tidak valid');
            }
        }
    
        const passwordValid = await UserService.passwordValid(password);
        if (!passwordValid) {
            throw new Error('Password minimal 6 karakter')
        }

        const salt = await bcrypt.genSalt(12);
        const hashPass = await bcrypt.hash(password, salt);

        let User = await UserService.registerUser(name, username, phoneNumber, address, email, hashPass, role, point);
        CartService.initializeCart(User.id);

        res.json({User});
    } catch (error) {
        res.status(400).json({
            'status': error.message
        })
    }
}

exports.login = async(req,res)=>{
    try {
        console.log('User.login');
        const {email,password} = req.body;
        let user;

        if (email.includes("@")) {
            user = await UserService.getUserEmail(email);
            if (!user) {
                throw new Error('Email belum didaftarkan');
            }
        } else {
            user = await UserService.getUsername(email);
            if (!user) {
                throw new Error('Username tidak ditemukan');
            }
        }
        
        const checkPassword = await user.checkPassword(password);
        if (!checkPassword) {
            throw new Error('Password salah');
        }
        
        let tokenData = {_id: user._id, email: user.email};
        const token = await UserService.generateToken(tokenData, "nWVg2ZKZlD4pLuhO3kh364ThQ7QslAEkk5GlIP9RnDyiDnKRkTbL2CVj7yURoWg", "7d");
        
        res.status(200).json({
            status: true,
            token: token,
            id: user._id,
            name: user.name,
            username: user.username,
            phoneNumber: user.phoneNumber,
            address: user.address,
            email: user.email,
            password: password,
            role: user.role,
            point: user.point,
            role: user.role
        })
    } catch (error) {
        res.status(400).json({
            'status': error.message
        })
    }
}

exports.validateUserData = async (req,res) => {
    try {
        console.log('User.validate');
        const {username, email, password, oldUsername, oldEmail} = req.body;

        if (username != oldUsername) {
            const usernameExist = await UserService.getUsername(username);
            if (usernameExist) {
                throw new Error('Username sudah terdaftar');
            }
        }

        if (email != oldEmail) {
            const emailExist = await UserService.getUserEmail(email);
            if (emailExist) {
                throw new Error('Email sudah terdaftar');
            }
        }

        const usernameValid = await UserService.usernameValid(username);
        if (!usernameValid) {
            throw new Error('Username tidak valid');
        }
    
        const passwordValid = await UserService.passwordValid(password);
        if (!passwordValid) {
            throw new Error('Password minimal 6 karakter')
        }

        res.status(200).json({
            'status': "success"
        });
    } catch (error) {
        res.status(400).json({
            'status': error.message
        })
    }
};

exports.updateUser = async(req,res) => {
    try {
        console.log('User.update');
        const id = req.params.id;
        const {name, username, phoneNumber, address, email, password} = req.body;
        
        const salt = await bcrypt.genSalt(12);
        const hashPass = await bcrypt.hash(password, salt);

        let User = await UserService.updateUser(id, name, username, phoneNumber, address, email, hashPass);
        res.json({User});
    } catch (error) {
        res.status(400).json({
            'status': error.message
        })
    }
}