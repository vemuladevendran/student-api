'use strict'

const Student = require('../../models/student');
const fs = require('fs/promises');


// creating student

const createStudent = async (req, res) => {
    try {
        const doc = await Student.findOne({ examNumber: req.examNumber, rollNumber: req.rollNumber });
        //  checking student already exist or not
        if (doc) {
            return res.status(400).json('Student RollNumber Or ExamNumer already exist')
        };

        //  extracting image from req

        if (req.file?.originalname) {
            const fileExt = req.file.originalname.split('.').pop();
            await fs.rename(req.file.path, `${req.file.path}.${fileExt}`);
            const staticHost = 'http://localhost:3000';
            req.body.photo = `${staticHost}/static/students/${req.file.filename}.${fileExt}`;
        };

        const result = await Student.create(req.body);
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


//  getting all students

const getStudents = async (req, res) => {

    try {
        const result = await Student.find({ isDeleted: false });
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


// get student by id

const getStudentById = async (req, res, next) => {
    try {
        const result = await Student.findOne(
            // removing deleted students 
            // filter the data mached with id 
            // password field is removing in get data -- ( projection )
            {
                isDeleted: false,
                id: req.params.id
            },
            { password: false });
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
};


//  update student

const updateStudent = async (req, res) => {
    try {
        const doc = await Student.findOneAndUpdate(
            // checking student
            {
                id: req.params.id,
                isDeleted: false,
            },
            req.body, { new: true });
        return res.json(doc);

    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
};

//  delete student

const deleteStudent = async (req, res) => {
    try {
        const doc = await Student.findOneAndUpdate({ id: req.params.id }, { isDeleted: true });
        return res.json('user deleted');

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};