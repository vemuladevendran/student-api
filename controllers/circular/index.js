'use strict'

const Circular = require('../../models/circular');
const Users = require('../../models/users');


// create circular
const createCircular = async (req, res) => {

    try {


        const creatingUser = await Users.findOne({ id: req.query.id });
        if (!creatingUser) {
            return res.status(400).json('Invalid details')
        }

        req.body.createdBy = creatingUser.firstName;


        const doc = await Circular.create(req.body);
        return res.json(doc);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

// get circular

const getCircular = async (req, res) => {
    try {
        const result = await Circular.find({ isDeleted: false });
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}


// get circular by branch

const getCircularByBranch = async (req, res) => {
    try {

        const branch = req.params.branch;
        const result = await Circular.find({
            isDeleted: false,
            $or: [
                { circularFor: 'all' },
                { circularFor: branch }
            ]
        })
      return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}


// delete circular


const deleteCircular = async (req, res) => {
    try {
        // cheaking user
        const results = await Circular.findOneAndUpdate({ id: req.params.id }, { isDeleted: true });
        return res.json('user deleted');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message }); u
    }
}


module.exports = {
    createCircular,
    getCircular,
    getCircularByBranch,
    deleteCircular
}