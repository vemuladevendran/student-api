'use strict'

const Users = require('../../models/users');
const PasswordServe = require('../../services/password');
const Token = require('../../services/token');

const createUser = async (req, res, next) => {
    try {
        const email = await Users.findOne({ email: req.body.email });
        if (email) {
            return res.status(400).json({ message: 'Email Already exist' });
        };

        req.body.password = await PasswordServe.hash(req.body.password);
        const result = await Users.create(req.body);
        const { password, ...data } = result.toObject();
        return res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
};


const login = async (req, res, next) => {

    try {

        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            console.error('user not found');
            return res.status(400).json({ message: 'Invalid Details' });
        };

        const isPasswordMatch = await PasswordServe.verify(req.body.password, user.password);

        if (!isPasswordMatch) {
            console.error('password wrong');
            return res.status(400).json({ message: 'Invalid Details' });
        };

        if (!user.isEmailVerified) {
            console.log('email not verified');
            return res.status(400).json({ message: 'Email not verified' });
        };

        const token = Token.generate({ id: user.id, });
        return res.json({ token: token });
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    };
};

const updateUser = async (req, res, next) => {
    try {
        const results = await Users.findOneAndUpdate({id: req.params.id}, req.body,{ new: true });
        return res.json(results);
    } catch (error) {
        console.error(error);
       return res.status(500).json({ message: error.message });
    }

};

const deleteUser = async (req, res, next) => {
    try {
        const results = await Users.findByIdAndRemove({id: req.params.id});
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
}