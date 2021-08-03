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
        const otp = await otpServe.generateOtp(result.id);

        //  sending verification mail

        // const emailHeader = 'CLICK THE ACTIVATE BUTTON TO ACTIVATE YOUR ACCOUNT';
        // const emailContent = 'For security purpose we are recommended to your default password give below by updating your password';
        // const userName = result.firstname;
        // const purpose = 'activationLink';
        // const buttonName = 'ACTIVATE';
        // const otpLink = `http://localhost:3000/api/v1/otp/${result.id}/${otp}`;
        // const defaultPassword = '';
        mailServe.sendOtp({
            reciver: req.body.email,
            emailContent: `<h1>ACTIVATION LINK</h1><br>
    <p>Click the below Activate button to activate your account</p><br>
    <button type="button" style="padding: 1rem 3rem; background-color: #70b0ed; border:0px; font-weight: bold"><a href="${otpLink}" style="color: white" target="_blank">ACTIVATE</a></button>`
        });

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
                isEmailVerified: true
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
        //  email id  will not be update
        // removing email id from the doc and updating the user
        const { email, ...data } = req.body;

        const results = await Users.findOneAndUpdate(
            // checking user
            {
                id: req.params.id,
                isDeleted: false
            },
            data,
            { new: true }
        );
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

};

// delete user

const deleteUser = async (req, res, next) => {
    try {
        // cheaking user
        const results = await Users.findOneAndUpdate({ id: req.params.id }, { isDeleted: true });
        return res.json('user deleted');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

};

// verifing otp

const verifyUser = async (req, res) => {
    try {
        await otpServe.verifyOtp(req.params.id, req.params.otp);
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