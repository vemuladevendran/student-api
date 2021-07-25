'use strict'

const Users = require('../../models/users');
const passwordServe = require('../../services/password')

const createUser = async((req, res, next) => {
    try {
        const email = await Users.findOne({ email: req.body.email });
        if (email) {
            return res.status(400).json({ message: 'Email Already exist' });
        }
        req.body.password = await passwordServe.hash(req.body.password);
        const result = await User.create(req.body);
        const { password, ...data } = result;
        res.json(data);
        
    } catch (error) {

    }
})


module.exports = {
    createUser,
}