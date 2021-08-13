'use strict'

const Report = require('../../models/report');
const Student = require('../../models/student');
const Users = require('../../models/users');


// create report
const createReport = async (req, res) => {

    try {

        const creatingUser = await Users.findOne({ id: req.params.id });
        if (!creatingUser) {
            return res.status(400).json('Invalid details')
        }


        const student = await Student.findOne({ rollNumber: req.studentRollNumber });
        console.log(student);

        if (!student) {
            return res.status(400).json({ message: 'Roll Number not exist' });
        }

        req.body.createdBy = creatingUser.firstName;


        const result = await Report.create(req.body);
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

// get report

const getReport = async (req, res) => {
    try {
        const result = await Report.find({ isDeleted: false });
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}


// get report by rollnumber

const getReportByRollNumber = async (req, res) => {
    try {

        const RollNumber = ''
        const result = await Report.find({
            isDeleted: false,
            RollNumber: RollNumber,
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}


// delete report


const deleteReport = async (req, res) => {
    try {
        // cheaking user
        const results = await Report.findOneAndUpdate({ id: req.params.id }, { isDeleted: true });
        return res.json('user deleted');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message }); u
    }
}


module.exports = {
    createReport,
    getReport,
    getReportByRollNumber,
    deleteReport,
}