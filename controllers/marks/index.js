const marks = require('../../models/marks');
const Marks = require('../../models/marks');


// creating marks
const createMarks = async (req, res) => {
    try {
        const data = await Marks.create(req.body);
        console.log(data);
        res.send(200).json({ message: 'Marks Created' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
};


// get marks

const getMarks = async (req, res) => {
    try {

        const filters = {
            isDeleted: false,
            $or: [
                {
                    branch: req?.query?.branch,
                    currentStudingYear: req?.query?.currentStudingYear,
                    section: req?.query.section
                }
            ]
        }

        const result = await Marks.find(filters)
        res.send(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
};

// get marks by rollNumber

const getMarksByRollnumber = async (req, res) => {
    try {
        const result = await Marks.find({ isDeleted: false, rollNumber: req?.params?.rollNumber })
        res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
}


//  update marks
const updateMarks = async (req, res) => {
    try {

        const result = await Marks.findOneAndUpdate(
            {
                id: req.params.id,
                isDeleted: false,
            },
            req.body, { new: true }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
};


// delete marks

const deleteMarks = async (req, res) => {
    try {
        const doc = await Marks.findOneAndUpdate({ id: req.params.id }, { isDeleted: true });
        return res.json('marks deleted');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
}



module.exports = {
    createMarks,
    getMarks,
    getMarksByRollnumber,
    updateMarks,
    deleteMarks
}