'use strict'

const ItSubjects = require('./subjects/itSubjects');
const CseSubjects = require('./subjects/cseSubjects');


const getSubjects = (req, res) => {
    const department = req.params.branch;

    if (department === 'Information Technology') {
        const semester = req.params.semester;
        const subjectsList = ItSubjects[semester];
        console.log(subjectsList);
        res.send(subjectsList)
    }


    if (department === 'Computer Science') {
        const semester = req.params.semester;
        const subjectsList = CseSubjects[semester];
        console.log(subjectsList);
        res.send(subjectsList)
    }

}



module.exports = {
    getSubjects,
}