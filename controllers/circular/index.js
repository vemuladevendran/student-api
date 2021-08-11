'use strict'

const Circular = require('../../models/circular');


// create circular
const createCircular = async (req, res) => {

    try {
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

        const branch = 'it'

        const result = await Circular.find({
            isDeleted: false,
            circularFor: 'all', branch,
        })


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