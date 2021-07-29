'use strict'

const Users = require('../../models/users');
const PasswordServe = require('../../services/password');
const otpServe = require('../../services/otp-generate');
const mailServe = require('../../services/email');
// creating user
const createUser = async (req, res, next) => {
    try {
        // checking role of creator 
        // const role = req.query.role;
        // if (role !== 'ADMIN') {
        //     return res.json('your not allowed for this operation');
        // };


        // checking email exist or not
        const email = await Users.findOne({ email: req.body.email });
        if (email) {
            return res.status(400).json({ message: 'Email Already exist' });
        };
        // hashing password using bcrypt
        req.body.password = await PasswordServe.hash(req.body.password);
        const result = await Users.create(req.body);
        const { password, ...data } = result.toObject();

        // generate otp
        const otp = await otpServe.generateOtp(req.body.id);

        //  sending verification mail

        mailServe.sendOtp({ reciver: req.body.email, otp: `http://localhost:3000/api/v1/otp/${result.id}/${otp}` });

        return res.json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
};
// get all users
const getUsers = async (req, res, next) => {
    try {
        const users = await Users.find(
            // removing deleted users 
            // password field is removing in get data -- ( projection )
            {
                isDeleted: false,
                // isEmailVerified: true
            },
            { password: false })
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
}

//  getting single user data
const getUserById = async (req, res, next) => {
    try {
        const result = await Users.findOne(
            // removing deleted users 
            // filter the data mached with id 
            // password field is removing in get data -- ( projection )
            {
                isDeleted: false,
                isEmailVerified: true,
                id: req.params.id
            },
            { password: false });
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
};


// updating the user

const updateUser = async (req, res, next) => {
    try {
        const { email, ...data } = req.body;

        const results = await Users.findOneAndUpdate(
            // checking user
            {
                id: req.params.id,
                isDeleted: false
            },
            data, { new: true });
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

};

const deleteUser = async (req, res, next) => {
    try {
        const results = await Users.findOneAndUpdate({ id: req.params.id }, { isDeleted: true });
        return res.json('user deleted');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

};


const verifyUser = async (req, res) => {
    try {
        await otpServe.verifyOtp(req.params.id, req.paramas.otp);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
    verifyUser,
}