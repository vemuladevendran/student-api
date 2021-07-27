'use strict'

const Users = require('../../models/users');
const PasswordServe = require('../../services/password');
const Token = require('../../services/token');

// creating user
const createUser = async (req, res, next) => {
    try {
        const email = await Users.findOne({ email: req.body.email });
        if (email) {
            return res.status(400).json({ message: 'Email Already exist' });
        };
        // hashing password using bcrypt
        req.body.password = await PasswordServe.hash(req.body.password);
        const result = await Users.create(req.body);
        const { password, ...data } = result.toObject();
        return res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
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
        res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
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
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
};


// login
const login = async (req, res, next) => {

    try {
        // checking email
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            console.error('user not found');
            return res.status(400).json({ message: 'Invalid Details' });
        };
        //  checking password
        const isPasswordMatch = await PasswordServe.verify(req.body.password, user.password);

        if (!isPasswordMatch) {
            console.error('password wrong');
            return res.status(400).json({ message: 'Invalid Details' });
        };
        // checking email verified or not
        if (!user.isEmailVerified) {
            console.log('email not verified');
            return res.status(400).json({ message: 'Email not verified' });
        };

        // if user details successfully checked 
        //  generating token if details is correct

        const token = Token.generate({ id: user.id, });
        return res.json({ token: token });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    };
};

// updating the user

const updateUser = async (req, res, next) => {
    try {
        const results = await Users.findOneAndUpdate(
            // checking user
            {
                id: req.params.id,
                isDeleted: false
            },
            req.body, { new: true });
        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

};

const deleteUser = async (req, res, next) => {
    try {
        const results = await Users.findOneAndUpdate({ id: req.params.id }, {isDeleted: true});
        return res.json('user deleted');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }

};


module.exports = {
    createUser,
    login,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
}